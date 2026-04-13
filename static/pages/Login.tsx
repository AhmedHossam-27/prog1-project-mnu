import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { LogIn, UserPlus } from "lucide-react";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      if (!name.trim()) { toast.error("Name is required"); return; }
      const ok = register(name, email, password);
      if (ok) { toast.success("Account created!"); navigate("/"); }
      else toast.error("Email already registered");
    } else {
      const ok = login(email, password);
      if (ok) { toast.success("Welcome back!"); navigate("/"); }
      else toast.error("Invalid credentials");
    }
  };

  return (
    <div className="pt-24 pb-16 flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-14 h-14 rounded-full bg-accent flex items-center justify-center mb-2">
            {isRegister ? <UserPlus className="h-6 w-6 text-accent-foreground" /> : <LogIn className="h-6 w-6 text-accent-foreground" />}
          </div>
          <CardTitle className="font-heading text-2xl">{isRegister ? "Create Account" : "Welcome Back"}</CardTitle>
          <CardDescription>{isRegister ? "Sign up to start booking hotels" : "Login to access your account"}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <Label>Full Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required />
              </div>
            )}
            <div>
              <Label>Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
            </div>
            <div>
              <Label>Password</Label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={4} />
            </div>
            <Button type="submit" className="w-full" size="lg">{isRegister ? "Register" : "Login"}</Button>
          </form>
          <div className="text-center mt-4">
            <button onClick={() => setIsRegister(!isRegister)} className="text-sm text-primary hover:underline">
              {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
