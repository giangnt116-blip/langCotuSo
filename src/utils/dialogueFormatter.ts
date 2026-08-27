export interface StoryDialogueItem {
  speaker: string;
  avatar: string;
  role: string;
  text: string;
}

export interface FormattedDialogueItem {
  speaker: string;
  avatar: string;
  role: string;
  text: string;
  isStudent: boolean;
  isCompanion?: boolean;
}

/**
 * Format dialogue speaker and text dynamically according to the student's name and companion Kiến Sáng.
 */
export function formatDialogueItem(
  dialogue: StoryDialogueItem,
  studentName?: string
): FormattedDialogueItem {
  const effectiveName = studentName?.trim() || 'Minh';
  const isStudentSpeaker =
    dialogue.role === 'Học sinh' ||
    ['Minh', 'Học sinh', 'Bạn học sinh', 'Bạn học sinh khám phá'].includes(dialogue.speaker);
  const isCompanionSpeaker =
    dialogue.speaker === 'Kiến Sáng' || dialogue.role === 'Bạn đồng hành' || dialogue.role === 'Bạn đồng hành FPT Schools';

  let formattedSpeaker = dialogue.speaker;
  let formattedRole = dialogue.role;
  let formattedText = dialogue.text;
  let avatar = dialogue.avatar;

  if (isStudentSpeaker) {
    formattedSpeaker = effectiveName;
    formattedRole = 'Học sinh khám phá';
    avatar = effectiveName.charAt(0).toUpperCase();
  } else if (isCompanionSpeaker) {
    formattedSpeaker = 'Kiến Sáng';
    formattedRole = 'Bạn đồng hành';
    avatar = '🐜';
  }

  // Replace occurrences in dialogue text
  formattedText = formattedText
    .replace(/Chào cháu An, cháu Minh!/gi, `Chào cháu Kiến Sáng và cháu ${effectiveName}!`)
    .replace(/Chào cháu Kiến Sáng và các bạn học sinh!/gi, `Chào cháu Kiến Sáng và cháu ${effectiveName}!`)
    .replace(/cháu An, cháu Minh/gi, `cháu ${effectiveName} và Kiến Sáng`)
    .replace(/cháu Minh, cháu An/gi, `cháu ${effectiveName} và Kiến Sáng`)
    .replace(/hai cháu Minh & An/gi, `cháu ${effectiveName} và Kiến Sáng`)
    .replace(/hai bạn học sinh Minh & An/gi, `bạn học sinh ${effectiveName} và Kiến Sáng`)
    .replace(/Đúng rồi Minh,/gi, `Đúng rồi ${effectiveName},`)
    .replace(/Đúng rồi Minh!/gi, `Đúng rồi ${effectiveName}!`)
    .replace(/chú mời hai cháu/gi, `chú mời cháu ${effectiveName} và Kiến Sáng`)
    .replace(/Mời hai bạn nhỏ/gi, `Mời cháu ${effectiveName} và bạn Kiến Sáng`)
    .replace(/hai cháu/gi, `cháu ${effectiveName} và Kiến Sáng`)
    .replace(/Minh & An/gi, `${effectiveName} & Kiến Sáng`);

  return {
    speaker: formattedSpeaker,
    avatar,
    role: formattedRole,
    text: formattedText,
    isStudent: isStudentSpeaker,
    isCompanion: isCompanionSpeaker,
  };
}
