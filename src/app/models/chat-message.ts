export interface ChatMessage {
  
message_side: any;
    message: string;
    user: string;
    roomDesc: string;
    audioMessage?: ArrayBuffer;
    fileData?: string;
    isVoice?: boolean;
}