import LoginForm from "../components/Auth/LoginForm1";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e4e5ed] px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-8">
          Social Network Login
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
