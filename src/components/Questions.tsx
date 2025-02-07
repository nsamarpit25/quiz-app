import type { Quiz } from "@/helper";
import React, { useState } from "react";

interface Props {
   quiz: Quiz;
}

export default function Questions({ quiz }: Props) {
   // index for current question
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

   // record of selected answers
   const [selectedAnswers, setSelectedAnswers] = useState<
      Record<number, number>
   >({});

   // if questions are completed
   const [showResults, setShowResults] = useState(false);

   // get current question
   const currentQuestion = quiz.questions[currentQuestionIndex];

   // handle option selection
   const handleOptionSelect = (questionId: number, optionId: number) => {
      setSelectedAnswers((prev) => ({
         ...prev,
         [questionId]: optionId,
      }));
   };

   // handle next question
   const handleNext = () => {
      if (currentQuestionIndex < quiz.questions.length - 1) {
         setCurrentQuestionIndex((prev) => prev + 1);
      } else {
         setShowResults(true);
      }
   };

   // calculate score
   const calculateScore = () => {
      let score = 0;
      quiz.questions.forEach((question) => {
         const selectedOptionId = selectedAnswers[question.id];
         const correctOption = question.options.find((opt) => opt.is_correct);
         if (
            selectedOptionId &&
            correctOption &&
            selectedOptionId === correctOption.id
         ) {
            score++;
         }
      });
      return score;
   };

   // render
   if (showResults) {
      return (
         <div className="min-h-screen bg-gray-900 p-8">
            <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl p-8 shadow-lg">
               <h2 className="text-3xl font-bold mb-6 text-white">
                  Quiz Complete! 🎉
               </h2>
               <div className="text-2xl text-emerald-400">
                  Your Score: {calculateScore()} out of {quiz.questions.length}
               </div>
               <div className="mt-4 text-gray-400">
                  {calculateScore() === quiz.questions.length
                     ? "Perfect score! Excellent work! 🌟"
                     : "Keep practicing to improve! 💪"}
               </div>

               <div className="mt-8">
                  <h3 className="text-xl font-bold text-white mb-4">
                     Correct Answers
                  </h3>
                  <ul className="space-y-2">
                     {quiz.questions.map((question) => {
                        const selectedOptionId = selectedAnswers[question.id];
                        const correctOption = question.options.find(
                           (opt) => opt.is_correct
                        );
                        return (
                           <li key={question.id}>
                              <h4 className="text-lg font-semibold text-white">
                                 {question.description}
                              </h4>
                              <p className="text-gray-400">
                                 {selectedOptionId === correctOption?.id
                                    ? "You got it right! 🎉"
                                    : "Oops! You missed this one! 😔"}
                              </p>
                           </li>
                        );
                     })}
                  </ul>
               </div>

               <div>
                  <button
                     onClick={() => {
                        setCurrentQuestionIndex(0);
                        setSelectedAnswers({});
                        setShowResults(false);
                     }}
                     className="mt-8 px-6 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-all"
                  >
                     Restart Quiz
                  </button>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-gray-900 p-4 md:p-8">
         <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
               <span className="text-emerald-400 font-medium">
                  Question {currentQuestionIndex + 1}/{quiz.questions.length}
               </span>
               <span className="text-gray-400">
                  {Math.floor(
                     (currentQuestionIndex / quiz.questions.length) * 100
                  )}
                  % Complete
               </span>
            </div>

            <div className="mb-8">
               <h2 className="text-xl font-bold mb-4 text-white">
                  {currentQuestion.description}
               </h2>

               <div className="space-y-3">
                  {currentQuestion.options.map((option) => (
                     <button
                        key={option.id}
                        onClick={() =>
                           handleOptionSelect(currentQuestion.id, option.id)
                        }
                        className={`w-full p-4 text-left rounded-lg transition-all duration-200 ${
                           selectedAnswers[currentQuestion.id] === option.id
                              ? "bg-emerald-600 text-white"
                              : "bg-gray-700 hover:bg-gray-600 text-gray-100"
                        }`}
                     >
                        {option.description}
                     </button>
                  ))}
               </div>
            </div>

            <div className="flex justify-between mt-6 gap-4">
               <button
                  onClick={() =>
                     setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
                  }
                  disabled={currentQuestionIndex === 0}
                  className="px-6 py-3 rounded-lg bg-gray-700 text-white hover:bg-gray-600
                           disabled:opacity-50 disabled:cursor-not-allowed transition-all"
               >
                  Previous
               </button>
               <button
                  onClick={handleNext}
                  disabled={!selectedAnswers[currentQuestion.id]}
                  className="px-6 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500
                           disabled:opacity-50 disabled:cursor-not-allowed transition-all"
               >
                  {currentQuestionIndex === quiz.questions.length - 1
                     ? "Finish Quiz"
                     : "Next"}
               </button>
            </div>
         </div>
      </div>
   );
}
