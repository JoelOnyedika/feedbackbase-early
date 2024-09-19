'use client'

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { ChevronRight, Star, Zap, Gift } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Image from 'next/image'

const NewsletterContent = () => (
  <div className="px-6 py-8 sm:p-10">
    <h3 className="text-xl font-semibold mb-4 text-white">This Month's Highlights</h3>
    <ul className="space-y-4">
      <NewsletterItem icon={Zap} text="New AI-powered insight generation feature launched" />
      <NewsletterItem icon={Star} text="Early adopter spotlight: How Company X increased reviews by 200%" />
      <NewsletterItem icon={Gift} text="Exclusive offer: Get 50% off our premium plan for 3 months" />
    </ul>
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 text-white">What's Coming Next</h3>
      <p className="text-base text-gray-300">We're working on some exciting new features, including:</p>
      <ul className="mt-4 space-y-2 list-disc list-inside text-gray-300">
        <li>Integration with popular CRM platforms</li>
        <li>Advanced sentiment analysis for customer feedback</li>
        <li>Custom survey templates for different industries</li>
      </ul>
    </div>
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 text-white">Stay Connected</h3>
      <p className="text-base text-gray-300">
        Don't miss out on future updates! Make sure to whitelist our email address and follow us on social media.
      </p>
      <div className="mt-4 flex space-x-4">
        <SocialLink href="https://x.com/HighOctane0000?t=aW_ljiJHkg9SM8gUAgMFRg&s=09" text="Twitter" />
        <SocialLink href="https://discord.com/invite/xwZ5WNek" text="Discord" />
        <SocialLink href="https://www.facebook.com/profile.php?id=61565804831325&mibextid=ZbWKwL" text="Facebook" />
      </div>
    </div>
  </div>
);

const NewsletterItem = ({ icon: Icon, text }) => (
  <li className="flex items-start">
    <Icon className="flex-shrink-0 h-6 w-6 text-purple-400" />
    <p className="ml-3 text-base text-gray-300">{text}</p>
  </li>
);

const SocialLink = ({ href, text }) => (
  <a href={href} className="text-purple-400 hover:text-purple-300">
    {text}
  </a>
);

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [showNewsletter, setShowNewsletter] = useState(true);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchUserData = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/users/${id}`);
          if (response.ok) {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
              const userData = await response.json();
              setUser(userData);
            } else {
              console.error('Response is not JSON:', await response.text());
            }
          } else {
            console.error('Failed to fetch user data:', await response.text());
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
  
    fetchUserData();
  }, [id]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const toggleNewsletter = () => setShowNewsletter(!showNewsletter);

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 shadow-xl rounded-lg overflow-hidden"
        >
          <div className="bg-purple-800 h-24 relative"></div>
          <div className="px-4 py-5 sm:p-6 -mt-12">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:items-center sm:space-x-5">
                <div className="flex-shrink-0">
                  <Image
                    className="mx-auto h-24 w-24 rounded-full border-4 border-gray-800"
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.username}`}
                    alt={user.username}
                  />
                </div>
                <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                  <p className="text-xl font-bold text-white sm:text-2xl">{user.username}</p>
                  <p className="text-sm font-medium text-gray-400">{user.email}</p>
                </div>
              </div>
              <div className="mt-5 flex justify-center sm:mt-0 animate-pulse">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://discord.com/invite/xwZ5WNek"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-700 hover:bg-purple-600"
                >
                  Join Discord
                </motion.a>
              </div>
            </div>
            <div className="mt-6 border-t border-gray-700 pt-6">
              <Alert variant="default" className="bg-gray-700 text-white">
                <Star className="h-4 w-4" />
                <AlertTitle>Early Adopter Status</AlertTitle>
                <AlertDescription>
                  You're an early adopter! Enjoy exclusive benefits and updates <b>+ a 40% discount when Feedbackflow launches</b>
                </AlertDescription>
              </Alert>
            </div>
            <div className="mt-6">
              <button
                onClick={toggleNewsletter}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-purple-100 bg-purple-900 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                {showNewsletter ? 'Hide' : 'View'} Newsletter
                <ChevronRight className={`ml-2 h-5 w-5 transform ${showNewsletter ? 'rotate-90' : ''} transition-transform`} />
              </button>
            </div>
          </div>
        </motion.div>

        {showNewsletter && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 bg-gray-800 shadow-xl rounded-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-700 to-indigo-800 px-6 py-8 sm:p-10">
              <h2 className="text-3xl font-extrabold text-white">Feedback Flow Insider</h2>
              <p className="mt-2 text-lg text-purple-100">Your exclusive newsletter for early adopters</p>
            </div>
            <NewsletterContent />
          </motion.div>
        )}
      </div>
    </div>
  );
}
