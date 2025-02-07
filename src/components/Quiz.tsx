"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import Questions from "./Questions";
import type { Quiz } from "@/helper";

const Quiz = () => {
   const [isStarted, setIsStarted] = useState(false);
   const [questions, setQuestions] = useState<Quiz>();
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const fetchQuestions = async () => {
         try {
            const { data } = await axios.get("/api/questions");
            setQuestions(data);
         } catch (error) {
            console.log(error);
         } finally {
            setIsLoading(false);
         }
      };
      fetchQuestions();
   }, []);

   if (isLoading) {
      return (
         <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
         </div>
      );
   }

   if (!questions) {
      return (
         <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="text-white text-xl">Failed to load quiz</div>
         </div>
      );
   }

   if (!isStarted) {
      return (
         <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-gray-800 rounded-xl p-8 shadow-lg">
               <h1 className="text-3xl font-bold text-white mb-4">
                  {questions.title}
               </h1>
               <div className="space-y-4 mb-8">
                  <p className="text-gray-300">{questions.description}</p>
                  <div className="flex flex-col gap-2 text-gray-400">
                     <div className="flex items-center gap-2">
                        <svg
                           className="w-5 h-5"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                           />
                        </svg>
                        <span>Duration: {questions.duration} minutes</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <svg
                           className="w-5 h-5"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                           />
                        </svg>
                        <span>{questions.questions.length} Questions</span>
                     </div>
                  </div>
               </div>
               <Button
                  onClick={() => setIsStarted(true)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg
                           transition-all duration-200 text-lg font-medium"
               >
                  Start Quiz
               </Button>
            </div>
         </div>
      );
   }

   return <Questions quiz={questions} />;
};

export default Quiz;
