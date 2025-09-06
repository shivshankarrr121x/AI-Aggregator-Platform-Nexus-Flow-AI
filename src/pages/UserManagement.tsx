import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Mail, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

interface UserProfile {
  id: string;
  email: string;
  created_at: string;
  email_confirmed_at: string | null;
  last_sign_in_at: string | null;
  user_metadata: {
    full_name?: string;
  };
}

export const UserManagement = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Note: This requires RLS policies or admin access
      // For demo purposes, we'll show the current user
      if (currentUser) {
        setUsers([{
          id: currentUser.id,
          email: currentUser.email || 'N/A',
          created_at: currentUser.created_at || '',
          email_confirmed_at: currentUser.email_confirmed_at,
          last_sign_in_at: currentUser.last_sign_in_at,
          user_metadata: currentUser.user_metadata || {}
        }]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-primary via-surface-secondary to-surface-tertiary p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/chat" className="inline-flex items-center gap-2 text-muted-foreground hover:text-neon-green transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Chat
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-neon-green to-neon-teal rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-background" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">User Management</h1>
              <p className="text-muted-foreground">View registered users</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="card-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-neon-green">{users.length}</div>
            </CardContent>
          </Card>
          
          <Card className="card-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Verified Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-neon-purple">
                {users.filter(u => u.email_confirmed_at).length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-neon-teal">
                {users.filter(u => {
                  const lastSignIn = u.last_sign_in_at ? new Date(u.last_sign_in_at) : null;
                  const today = new Date();
                  return lastSignIn && lastSignIn.toDateString() === today.toDateString();
                }).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users List */}
        <Card className="card-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Registered Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 rounded-lg bg-surface-secondary/50 border border-border/30">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-green to-neon-teal flex items-center justify-center text-background font-semibold">
                      {user.user_metadata.full_name ? user.user_metadata.full_name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium">{user.user_metadata.full_name || 'Unnamed User'}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>Joined {formatDate(user.created_at)}</span>
                      </div>
                      <div className="text-muted-foreground">
                        Last seen {formatDate(user.last_sign_in_at)}
                      </div>
                    </div>
                    
                    <Badge variant={user.email_confirmed_at ? "default" : "secondary"}>
                      {user.email_confirmed_at ? "Verified" : "Unverified"}
                    </Badge>
                  </div>
                </div>
              ))}
              
              {users.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No users found
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Note */}
        <div className="mt-6 p-4 rounded-lg bg-surface-secondary/30 border border-border/30">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Currently showing your own user data. To view all users, you'll need to set up admin access with proper RLS policies in Supabase.
          </p>
        </div>
      </div>
    </div>
  );
};