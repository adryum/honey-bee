// Copyright 2012 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { google } from 'googleapis';
import { RowDataPacket } from 'mysql2';
import { pool } from './Database';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI; // e.g. https://yourdomain.com/auth/google/callback

export const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
);

export const scopes = [
    'openid',
    'email',
    'profile',
    'https://www.googleapis.com/auth/calendar.events'
];

/**
 
This is one of the many ways you can configure googleapis to use authentication credentials. In this method, we're setting a global reference for all APIs. Any other API you use here, like google.drive('v3'), will now use this auth client. You can also override the auth client at the service and method call levels.*/
google.options({auth: oauth2Client});
// A simple object to track active refreshes outside the function
const activeRefreshes = new Map<number, Promise<string>>();

export async function getValidToken(userId: number, session: any) {
    // 1. If we have a valid token in session, return it immediately
    if (session.googleAccessToken) {
        return session.googleAccessToken;
    }

    // 2. If a refresh is ALREADY happening for this user, return that existing promise
    if (activeRefreshes.has(userId)) {
        console.log("Waiting for existing refresh to finish...");
        return activeRefreshes.get(userId);
    }

    // 3. Start the refresh process and save the promise in the map
    const refreshPromise = (async () => {
        try {
            const [rows] = await pool.query<RowDataPacket[]>(
                "SELECT googleRefreshToken FROM users WHERE id = ?",
                [userId]
            );
            const refreshToken = rows[0]?.googleRefreshToken;

            if (!refreshToken) throw new Error("No refresh token");

            oauth2Client.setCredentials({ refresh_token: refreshToken });
            const { credentials } = await oauth2Client.refreshAccessToken();
            
            // Save to session
            session.googleAccessToken = credentials.access_token;
            await session.save();

            return credentials.access_token!;
        } finally {
            // 4. VERY IMPORTANT: Remove the promise from the map when done (success or fail)
            activeRefreshes.delete(userId);
        }
    })();

    activeRefreshes.set(userId, refreshPromise);
    return refreshPromise;
}