import * as z from "zod";

// --- Schema de Login (Existente) ---
export const LoginSchema = z.object({
  email: z.string()
    .min(1, { message: "O e-mail é obrigatório." })
    .email({ message: "Por favor, insira um endereço de e-mail válido." }),
  password: z.string()
    .min(1, { message: "A senha é obrigatória." })
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres." }),
});

export type TLoginSchema = z.infer<typeof LoginSchema>;


// --- NOVO SCHEMA: Cadastro de Planta ---

const MAX_FILE_SIZE = 5_000_000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const PlantRegisterSchema = z.object({
  nomePlanta: z.string()
    .min(3, { message: "O nome da planta deve ter pelo menos 3 caracteres." }),
  
  nomeCientifico: z.string()
    .optional(), // Opcional

  descricao: z.string()
    .min(10, { message: "A descrição deve ter pelo menos 10 caracteres." })
    .max(500, { message: "A descrição não pode ter mais de 500 caracteres." }),
  
  localizacao: z.string()
    .min(2, { message: "A localização é obrigatória." }),
  
  // A validação de 'FileList' é um pouco mais complexa
  fotoPlanta: z.any()
    .refine((files): files is FileList => files instanceof FileList && files.length > 0, "A foto é obrigatória.")
    .refine((files) => files[0]?.size <= MAX_FILE_SIZE, "Tamanho máximo do arquivo é 5MB.")
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
      "Apenas formatos .jpg, .jpeg, .png e .webp são aceitos."
    ),
});

export type TPlantRegisterSchema = z.infer<typeof PlantRegisterSchema>;