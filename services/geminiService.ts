
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("API_KEY not found. Please set the environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateNickname = async (): Promise<string> => {
    try {
        const prompt = `Você é um gerador de apelidos de zoeira. Crie um apelido curto, absurdo e engraçado para meu amigo Carlos, também conhecido como CRL. Ele é famoso por: ter mamilos de calabresa, dançar mexendo só os ombros, adorar festas em barcos, ser um diretor misterioso na empresa 'Odilon' onde bajula o chefe, ser obcecado por 'pecesas' (mulheres), e sempre derrubar cerveja nos outros. O apelido deve ser apenas o apelido, sem nenhuma outra frase ou explicação. Seja criativo e hilário. Retorne apenas o apelido.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text.trim();
    } catch (error) {
        console.error("Error generating nickname:", error);
        throw new Error("A IA está ocupada agradando o Sr. Odilon. Tente de novo.");
    }
};

const fileUrlToBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

export const generateMeme = async (baseImage: string, prompt: string): Promise<string> => {
    try {
        const base64Data = await fileUrlToBase64(baseImage);
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64Data,
                            mimeType: 'image/png',
                        },
                    },
                    { text: prompt },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });
        
        const firstPart = response.candidates?.[0]?.content?.parts[0];
        if (firstPart && 'inlineData' in firstPart && firstPart.inlineData) {
            return `data:${firstPart.inlineData.mimeType};base64,${firstPart.inlineData.data}`;
        }

        throw new Error("A IA não conseguiu criar a arte. Provavelmente foi tomar uma Corona.");

    } catch (error) {
        console.error("Error generating meme:", error);
        throw new Error("Falha na criação do meme. A culpa é do estagiário.");
    }
};
