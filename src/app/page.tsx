'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, Zap, Code, PieChart, Pencil } from 'lucide-react';
import Layout from '@/components/Layout';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClipLoader } from 'react-spinners';

const formSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address')
});

type FormData = z.infer<typeof formSchema>;

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface Status {
  message: string;
  isError: boolean;
}

interface ApiResponse {
  userId?: string;
  isNewUser?: boolean;
  error?: string;
}

export default function LandingPage(): JSX.Element {
  const [status, setStatus] = useState<Status>({ message: '', isError: false });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const features: Feature[] = [
    { icon: Star, title: 'Market Fit', description: 'Gather internal feedback at the most opportune times.' },
    { icon: ThumbsUp, title: 'More Positive Reviews', description: 'Route happy users to leave 5-star reviews.' },
    { icon: Zap, title: 'Enhanced with AI', description: 'Automatically surface actionable insights.' },
    { icon: Code, title: '2-Line Integration', description: 'Easy setup with just 2 lines of code.' },
    { icon: PieChart, title: 'Effortless Analytics', description: 'Set it on autopilot and watch results roll in.' },
    { icon: Pencil, title: 'Fully Customizable', description: 'Edit any part of the survey, widget, and landing page.' },
  ];

  const onSubmit = async (data: FormData): Promise<void> => {
    setIsLoading(true);
    setStatus({ message: '', isError: false });
    console.log(data);
  
    try {
      const response: Response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      const responseData: ApiResponse = await response.json();
  
      if (!response.ok) {
        setStatus({ 
          message: responseData.error || `An error occurred. Please try again later.`, 
          isError: true 
        });
        return;
      }
  
      if (responseData.userId) {
        setStatus({ 
          message: responseData.isNewUser ? 'Signed up successfully!' : 'Welcome back!', 
          isError: false 
        });
        router.push(`/profile/${responseData.userId}`);
      } else {
        setStatus({ 
          message: 'An unexpected error occurred. Please try again later.', 
          isError: true 
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus({ 
        message: 'An unexpected error occurred. Please try again later.', 
        isError: true 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold text-center mb-8">Get Early Access to Feedback Flow</h1>
        <p className="text-xl text-center mb-12">Experience the future of customer feedback</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-6 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {status.message && (
          <Alert variant={status.isError ? "destructive" : "default"} className="mb-4 text-white">
            <AlertTitle className='text-white'>{status.isError ? "Error" : "Success"}</AlertTitle>
            <AlertDescription className='text-white'>{status.message}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
          <input
            type="text"
            {...register('username')}
            placeholder="Username"
            className="w-full p-2 mb-4 bg-gray-800 rounded"
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}
          
          <input
            type="email"
            {...register('email')}
            placeholder="Email"
            className="w-full p-2 mb-4 bg-gray-800 rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full p-2 bg-purple-600 rounded font-bold flex justify-center items-center"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <ClipLoader size={20} color="#ffffff" /> : 'Join Now & Get 40% Off'}
          </motion.button>
        </form>
      </motion.div>
    </Layout>
  );
}