interface QuizOption {
   id: number;
   description: string;
   is_correct: boolean;
}

interface QuizQuestion {
   id: number;
   description: string;
   options: QuizOption[];
   detailed_solution: string;
}

export interface Quiz {
   title: string;
   description: string;
   duration: number;
   questions: QuizQuestion[];
}

export interface QuizResponse {
   id: number;
   name: string;
   title: string;
   description: string;
   difficulty_level: string;
   topic: string;
   time: string;
   is_published: boolean;
   created_at: string;
   updated_at: string;
   duration: number;
   end_time: string;
   negative_marks: string;
   correct_answer_marks: string;
   shuffle: boolean;
   show_answers: boolean;
   lock_solutions: boolean;
   is_form: boolean;
   show_mastery_option: boolean;
   reading_material: unknown;
   quiz_type: unknown;
   is_custom: boolean;
   banner_id: unknown;
   exam_id: unknown;
   show_unanswered: boolean;
   ends_at: string;
   lives: unknown;
   live_count: string;
   coin_count: number;
   questions_count: number;
   daily_date: string;
   max_mistake_count: number;
   reading_materials: unknown[];
   questions: Question[];
   progress: number;
}

export interface Question {
   id: number;
   description: string;
   difficulty_level: string;
   topic: string;
   is_published: boolean;
   created_at: string;
   updated_at: string;
   detailed_solution: string;
   type?: string;
   is_mandatory: boolean;
   show_in_feed: boolean;
   pyq_label?: string;
   topic_id: number;
   reading_material_id: number;
   fixed_at?: string;
   fix_summary?: string;
   created_by: Date;
   updated_by?: string;
   quiz_level: string;
   question_from: string;
   language: string;
   photo_url: string;
   photo_solution_url: string;
   is_saved: boolean;
   tag: string;
   options: Option[];
   reading_material: ReadingMaterial;
}

export interface Option {
   id: number;
   description: string;
   question_id: number;
   is_correct: boolean;
   created_at: string;
   updated_at: string;
   unanswered: boolean;
   photo_url: string;
}

export interface ReadingMaterial {
   id: number;
   keywords: string;
   content: string;
   created_at: string;
   updated_at: string;
   content_sections: string[];
   practice_material: PracticeMaterial;
}

export interface PracticeMaterial {
   content: string[];
   keywords: string[];
}

export function extractQuizData(jsonData: QuizResponse): Quiz {
   const { title, description, duration, questions } = jsonData;

   const processedQuestions = questions.map((q: Question) => ({
      id: q.id,
      description: q.description,
      detailed_solution: q.detailed_solution,
      options: q.options.map((opt: Option) => ({
         id: opt.id,
         description: opt.description,
         is_correct: opt.is_correct,
      })),
   }));

   return {
      title,
      description,
      duration,
      questions: processedQuestions,
   };
}
