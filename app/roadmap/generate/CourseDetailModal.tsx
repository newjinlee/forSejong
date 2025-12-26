"use client";

import React from 'react';
import { X, BookOpen, Hash, Award, GraduationCap } from 'lucide-react';
import { getCourseDetail, type CourseDetail } from '@/src/data/courseDetails';

type CourseDetailModalProps = {
  courseName: string;
  courseType?: '전필' | '전선' | '교양';
  credits?: number;
  isOpen: boolean;
  onClose: () => void;
};

export default function CourseDetailModal({
  courseName,
  courseType,
  credits,
  isOpen,
  onClose,
}: CourseDetailModalProps) {
  if (!isOpen) return null;

  // 과목 상세 정보 조회
  const detail = getCourseDetail(courseName);

  // 정보가 없으면 기본값 사용
  const displayData: CourseDetail = detail || {
    id: '------',
    name: courseName,
    type: courseType || '전공',
    credits: credits || 3,
    description: '해당 과목의 상세 정보가 등록되지 않았습니다.',
  };

  // 이수구분 배지 색상
  const getTypeBadgeStyle = (type: string) => {
    if (type.includes('전필') || type.includes('전공필수')) {
      return 'bg-red-100 text-red-700 border-red-200';
    }
    if (type.includes('전선') || type.includes('전공선택')) {
      return 'bg-blue-100 text-blue-700 border-blue-200';
    }
    if (type.includes('기초')) {
      return 'bg-purple-100 text-purple-700 border-purple-200';
    }
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* 모달 콘텐츠 */}
      <div 
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-[#c3002f] to-[#a00026] px-6 py-5 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex-1 pr-8">
              <h2 className="text-xl font-bold leading-tight">
                {displayData.name}
              </h2>
              <div className="mt-2">
                <span className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full border ${getTypeBadgeStyle(displayData.type)}`}>
                  {displayData.type}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* 과목 정보 */}
        <div className="p-6">
          {/* 기본 정보 그리드 */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Hash className="w-4 h-4 text-slate-500" />
              </div>
              <div>
                <p className="text-xs text-slate-500">학수번호</p>
                <p className="font-semibold text-slate-800">{displayData.id}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <GraduationCap className="w-4 h-4 text-slate-500" />
              </div>
              <div>
                <p className="text-xs text-slate-500">학점</p>
                <p className="font-semibold text-slate-800">{displayData.credits}학점</p>
              </div>
            </div>
          </div>
          
          {/* 과목 소개 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-[#c3002f]" />
              <h3 className="font-semibold text-slate-800">과목 소개</h3>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-sm text-slate-600 leading-relaxed">
                {displayData.description}
              </p>
            </div>
          </div>
        </div>
        
        {/* 하단 버튼 */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}