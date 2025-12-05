import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../config/supabase';

export interface AuthRequest extends Request {
  user?: any;
  orgId?: string;
}

export const requireAuth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // 1. Get the token from headers
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Missing or invalid Authorization header' });
      return;
    }

    const token = authHeader.split(' ')[1];

    // 2. Verify Token with Supabase
    // console.log('Checking Token:', token); // Debug Log
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error) {
       console.error('Supabase Auth Error:', error.message);
       res.status(401).json({ error: `Auth Falied: ${error.message}` });
       return;
    }

    if (!user) {
      console.error('No user found for token');
      res.status(401).json({ error: 'Invalid or expired token (No User)' });
      return;
    }

    // 3. Find the User's Organization
    let { data: org } = await supabaseAdmin
      .from('organizations')
      .select('id')
      .eq('owner_id', user.id)
      .single();

    // --- AUTO-CREATE ORG IF MISSING (Lazy Provisioning) ---
    if (!org) {
      console.log(`⚠️ User ${user.email} has no organization. Creating valid default...`);
      const { data: newOrg, error: createError } = await supabaseAdmin
        .from('organizations')
        .insert({
          name: `${user.email}'s Organization`,
          owner_id: user.id
        })
        .select('id')
        .single();

      if (createError) {
        console.error('Failed to auto-create organization:', createError);
        res.status(500).json({ error: 'Failed to create organization profile' });
        return;
      }
      org = newOrg;
    }

    // 4. Attach to Request Object
    req.user = user;
    req.orgId = org.id;

    next(); // Pass control to the next route handler

  } catch (error) {
    console.error('Auth Middleware Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};