import LeftPanel from "./LeftPanel";
import RegisterForm from "./RegisterForm";

export default function Register() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          {/* LEFT */}
          <div className="lg:col-span-2 p-6">
            <LeftPanel page={1} />
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-3 p-6 flex items-center justify-center">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
