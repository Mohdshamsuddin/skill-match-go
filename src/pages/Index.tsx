import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import LanguageSelector from '@/components/common/LanguageSelector';
import { Briefcase, User, MapPin, MessageCircle, Wand } from 'lucide-react';

const Index = () => {
  const { translate } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mr-2">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <h1 className="text-2xl font-bold text-primary">SkillLink</h1>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <Link to="/login">
              <Button variant="outline" size="lg">
                {translate("login")}
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg">
                {translate("register")}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 md:flex items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {translate("find_work_easily")}
            </h2>
            <p className="text-xl mb-8">
              {translate("hero_description")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="text-lg">
                  {translate("signup")}
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-lg">
                  {translate("login")}
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-12">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-center justify-center h-full">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-white font-bold text-6xl">S</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {translate("app_features")}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <User size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{translate("signup")}</h3>
              <p className="text-gray-600">
                {translate("find_jobs_description")}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Briefcase size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{translate("find jobs")}</h3>
              <p className="text-gray-600">
                {translate("find_jobs_description")}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <User size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{translate("easy apply")}</h3>
              <p className="text-gray-600">
                {translate("easy_apply_description")}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <MapPin size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{translate("location")}</h3>
              <p className="text-gray-600">
                {translate("location_based_description")}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <MessageCircle size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{translate("chat with us")}</h3>
              <p className="text-gray-600">
                {translate("direct_chat_description")}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col items-center text-center lg:col-span-5">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Wand size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{translate("generative ai")}</h3>
              <p className="text-gray-600">
                {translate("Use AI to enhance your job search and application process")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary/20 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            {translate("ready_to_start")}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {translate("cta_description")}
          </p>
          <Link to="/register">
            <Button size="lg" className="text-lg px-8">
              {translate("signup")}
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <h3 className="text-xl font-bold">SkillLink</h3>
              </div>
              <p className="text-gray-400">
                {translate("footer_description")}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">{translate("quick_links")}</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">{translate("about_us")}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">{translate("how_it_works")}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">{translate("for_employers")}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">{translate("testimonials")}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">{translate("support")}</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">{translate("faq")}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">{translate("contact")}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">{translate("privacy_policy")}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">{translate("terms")}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">{translate("contact_us")}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>contact@skilllink.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Main Street, City</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2023 SkillLink. {translate("all_rights")}
            </p>
            <div className="mt-4 md:mt-0">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
