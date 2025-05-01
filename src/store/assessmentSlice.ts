import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 定义SCL-90的维度
export type SCLDimension = 
  | 'somatization'         // 躯体化
  | 'obsessiveCompulsive'  // 强迫症状
  | 'interpersonalSensitivity' // 人际关系敏感
  | 'depression'           // 抑郁
  | 'anxiety'              // 焦虑
  | 'hostility'            // 敌对
  | 'phobicAnxiety'        // 恐怖
  | 'paranoidIdeation'     // 偏执
  | 'psychoticism'         // 精神病性
  | 'additional';          // 附加项目

// 定义单个问题的接口
export interface SCLQuestion {
  id: number;
  dimensionKey: SCLDimension;
  translationKey: string;
}

// 定义单次测评的结果
export interface AssessmentResult {
  id: string;
  userId: string;
  answers: Record<number, number>; // 问题ID -> 得分 (1-5)
  dimensionScores: Record<SCLDimension, number>;
  totalScore: number;
  date: string;
  isCompleted: boolean;
}

// 定义状态类型
interface AssessmentState {
  questions: SCLQuestion[];
  currentQuestionIndex: number;
  currentAssessment: AssessmentResult | null;
  savedAssessments: AssessmentResult[];
  loading: boolean;
  error: string | null;
}

// 创建初始状态
const initialState: AssessmentState = {
  questions: [],
  currentQuestionIndex: 0,
  currentAssessment: null,
  savedAssessments: [],
  loading: false,
  error: null
};

// 创建slice
export const assessmentSlice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {
    // 其余功能将在后续实现
    setQuestions: (state, action: PayloadAction<SCLQuestion[]>) => {
      state.questions = action.payload;
    }
  }
});

// 导出actions
export const { setQuestions } = assessmentSlice.actions;

// 导出reducer
export default assessmentSlice.reducer; 