
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LanguageSelector from "@/components/common/LanguageSelector";

const PhoneLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [error, setError] = useState("");
  const { loginWithPhone, verifyPhoneCode, loading } = useAuth();
  const { translate } = useLanguage();

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!phoneNumber) {
      setError("Please enter your phone number");
      return;
    }

    try {
      await loginWithPhone(phoneNumber);
      setCodeSent(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to send verification code");
      }
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!verificationCode) {
      setError("Please enter the verification code");
      return;
    }

    try {
      await verifyPhoneCode(verificationCode);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to verify code");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          {codeSent ? translate("verify_phone") : translate("phone_login")}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {codeSent 
            ? translate("enter_verification_code") 
            : translate("phone_login_description")}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          {!codeSent ? (
            <form className="space-y-6" onSubmit={handleSendCode}>
              <div>
                <Label htmlFor="phoneNumber" className="text-base">
                  {translate("phone")}
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="mt-1 h-12 text-base"
                  placeholder="+91 1234567890"
                />
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full h-12 text-base"
                  disabled={loading}
                >
                  {loading ? <Spinner size="sm" /> : translate("send_code")}
                </Button>
              </div>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleVerifyCode}>
              <div>
                <Label htmlFor="verificationCode" className="text-base">
                  {translate("verification_code")}
                </Label>
                <Input
                  id="verificationCode"
                  name="verificationCode"
                  type="text"
                  required
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="mt-1 h-12 text-base text-center tracking-widest"
                  placeholder="123456"
                  maxLength={6}
                />
                <p className="mt-2 text-sm text-gray-500">
                  {translate("code_sent_to")} {phoneNumber}
                </p>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full h-12 text-base"
                  disabled={loading}
                >
                  {loading ? <Spinner size="sm" /> : translate("verify")}
                </Button>
              </div>
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setCodeSent(false)}
                  className="text-primary hover:text-primary/80 text-sm font-medium"
                >
                  {translate("change_phone")}
                </button>
              </div>
            </form>
          )}
          
          <p className="mt-8 text-center text-sm text-gray-600">
            {translate("prefer_email")}{" "}
            <Link to="/login" className="font-medium text-primary hover:text-primary/80">
              {translate("login_with_email")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhoneLogin;
