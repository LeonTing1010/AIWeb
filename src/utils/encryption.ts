/**
 * 简单的数据加密解密工具
 * 注意：这种简单加密只适用于基本保护，
 * 实际生产环境中应使用更强大的加密库如CryptoJS
 */

// 简单的加密密钥，实际应用中应该使用环境变量或其他安全方式存储
const SECRET_KEY = 'SCL90-Assessment-Secret-Key-2024';

/**
 * 加密字符串数据
 * @param data 要加密的字符串
 * @returns 加密后的字符串
 */
export const encryptData = (data: string): string => {
  try {
    // 简单的Base64编码 + 字符混淆
    const base64 = btoa(encodeURIComponent(data));
    let encrypted = '';
    
    for (let i = 0; i < base64.length; i++) {
      // 对每个字符使用密钥中对应位置的字符进行XOR操作
      const keyChar = SECRET_KEY.charCodeAt(i % SECRET_KEY.length);
      const dataChar = base64.charCodeAt(i);
      encrypted += String.fromCharCode(dataChar ^ keyChar);
    }
    
    // 再次Base64编码
    return btoa(encrypted);
  } catch (error) {
    console.error('Encryption failed:', error);
    return '';
  }
};

/**
 * 解密字符串数据
 * @param encrypted 加密后的字符串
 * @returns 解密后的原始字符串
 */
export const decryptData = (encrypted: string): string => {
  try {
    // 先解Base64
    const base64Decoded = atob(encrypted);
    let decoded = '';
    
    // 反向XOR操作
    for (let i = 0; i < base64Decoded.length; i++) {
      const keyChar = SECRET_KEY.charCodeAt(i % SECRET_KEY.length);
      const dataChar = base64Decoded.charCodeAt(i);
      decoded += String.fromCharCode(dataChar ^ keyChar);
    }
    
    // 再解Base64并URL解码
    return decodeURIComponent(atob(decoded));
  } catch (error) {
    console.error('Decryption failed:', error);
    return '';
  }
}; 