import type { Quiz } from "@/helper";
import { useEffect, useState } from "react";

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

   // Add new state for duration
   const [startTime, setStartTime] = useState<number>(0);
   const [duration, setDuration] = useState<number>(0);

   // Add new states for timer
   const QUIZ_TIME = quiz.duration * 60; // 5 minutes in seconds
   const [timeLeft, setTimeLeft] = useState(QUIZ_TIME);

   // Add useEffect to set start time when component mounts
   useEffect(() => {
      setStartTime(Date.now());
   }, []);

   // Add auto-submit functionality
   useEffect(() => {
      if (!showResults) {
         const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
               if (prevTime <= 1) {
                  clearInterval(timer);
                  // Auto submit when time runs out
                  const endTime = Date.now();
                  const totalDuration = Math.floor(
                     (endTime - startTime) / 1000
                  );
                  setDuration(totalDuration);
                  setShowResults(true);
                  return 0;
               }
               return prevTime - 1;
            });
         }, 1000);

         return () => clearInterval(timer);
      }
   }, [showResults, startTime]);

   // get current question
   const currentQuestion = quiz.questions[currentQuestionIndex];

   // handle option selection
   const handleOptionSelect = (questionId: number, optionId: number) => {
      setSelectedAnswers((prev) => ({
         ...prev,
         [questionId]: optionId,
      }));
   };

   // Modify handleNext to not handle time calculations (now handled in timer)
   const handleNext = () => {
      if (currentQuestionIndex < quiz.questions.length - 1) {
         setCurrentQuestionIndex((prev) => prev + 1);
      } else {
         const endTime = Date.now();
         const totalDuration = Math.floor((endTime - startTime) / 1000);
         setDuration(totalDuration);
         setShowResults(true);
      }
   };

   // Modified restart function
   const handleRestart = () => {
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setShowResults(false);
      setTimeLeft(QUIZ_TIME);
      setStartTime(Date.now());
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
      return { score, duration }; // Return both score and duration
   };

   // Format time function
   const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
   };

   // render
   if (showResults) {
      return (
         <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
            <div className="max-w-3xl mx-auto">
               <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
                  <h2 className="text-4xl font-bold text-white mb-4">
                     Quiz Results
                  </h2>

                  <div className="flex items-center justify-between mb-8 p-4 bg-white/5 rounded-lg">
                     <div>
                        <p className="text-gray-400">Final Score</p>
                        <p className="text-3xl font-bold text-white">
                           {calculateScore().score} / {quiz.questions.length}
                        </p>
                     </div>
                     <div>
                        <p className="text-gray-400">Time Taken</p>
                        <p className="text-3xl font-bold text-white">
                           {calculateScore().duration} seconds
                        </p>
                     </div>
                     <div>
                        <p className="text-gray-400">Accuracy</p>
                        <p className="text-3xl font-bold text-white">
                           {Math.round(
                              (calculateScore().score / quiz.questions.length) *
                                 100
                           )}
                           %
                        </p>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <h3 className="text-2xl font-semibold text-white mb-4">
                        Detailed Review
                     </h3>
                     {quiz.questions.map((question, index) => {
                        const selectedOptionId = selectedAnswers[question.id];
                        const correctOption = question.options.find(
                           (opt) => opt.is_correct
                        );
                        const isCorrect =
                           selectedOptionId === correctOption?.id;

                        return (
                           <div
                              key={question.id}
                              className={`p-6 rounded-lg ${
                                 isCorrect ? "bg-green-900/20" : "bg-red-900/20"
                              }`}
                           >
                              <div className="flex items-center gap-4 mb-2">
                                 <span className="text-lg font-medium text-gray-400">
                                    Q{index + 1}
                                 </span>
                                 <h4 className="text-lg font-semibold text-white">
                                    {question.description}
                                 </h4>
                              </div>

                              <div className="ml-8 space-y-2">
                                 <div className="flex items-center gap-2">
                                    <span
                                       className={`text-${
                                          isCorrect ? "green" : "red"
                                       }-400`}
                                    >
                                       {isCorrect ? "✓" : "✗"}
                                    </span>
                                    <p className="text-gray-300">
                                       Your answer:{" "}
                                       {question.options.find(
                                          (opt) => opt.id === selectedOptionId
                                       )?.description || "Not answered"}
                                    </p>
                                 </div>

                                 {!isCorrect && (
                                    <div className="flex items-center gap-2">
                                       <span className="text-green-400">✓</span>
                                       <p className="text-gray-300">
                                          Correct answer:{" "}
                                          {correctOption?.description}
                                       </p>
                                    </div>
                                 )}
                              </div>
                           </div>
                        );
                     })}
                  </div>

                  <div className="mt-8 flex justify-center">
                     <button
                        onClick={handleRestart}
                        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                     >
                        Restart Quiz
                     </button>
                  </div>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-gray-900 p-4 md:p-8 w-full">
         <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
               <span className="text-emerald-400 font-medium">
                  Question {currentQuestionIndex + 1}/{quiz.questions.length}
               </span>
               <span className="text-emerald-400 font-medium">
                  Time Left: {formatTime(timeLeft)}
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
