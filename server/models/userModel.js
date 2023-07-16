import { object, string } from "zod";

const registerUserSchema = object({
  email: string({
    required_error: "L'adresse email est requise",
  }).email({
    message: "Format de l'email invalide",
  }),
  password: string({
    invalid_type_error: "Type de mot de passe invalide",
    required_error: "Le mot de passe est requis",
  }).min(8, {
    message: "Le mot de passe doit contenir au moins 8 caractères",
  }),
  confirmPassword: string({
    required_error: "La confirmation du mot de passe est requise",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["password", "confirmPassword"],
});

const loginUserSchema = object({
  email: string().email({
    message: "Format de l'adresse email invalide",
  }),
  password: string().min(8, {
    message: "Le mot de passe doit contenir au moins 8 caractères",
  }),
});

const updateUserSchema = object({
  firstName: string({
    invalid_type_error: "Le type du prénom est invalide",
  }).optional(),
  lastName: string({
    invalid_type_error: "Le type du nom de famille est invalide",
  }).optional(),
  email: string()
    .email({
      message: "Le format de l'email est invalide",
    })
    .optional(),
  password: string({
    invalid_type_error: "Le type du mot de passe est invalide",
    required_error: "Le mot de passe est requis",
  })
    .min(8, {
      message: "Le mot de passe doit contenir au moins 8 caractères",
    })
    .optional(),
  gender: string({
    invalid_type_error: "Le type du genre est invalide",
  }).optional(),
  address: string({
    invalid_type_error: "Le type de l'adresse est invalide",
  }).optional(),
  phone: string({
    invalid_type_error: "Le type du numéro de téléphone est invalide",
  }).optional(),
  status: string({
    invalid_type_error: "Le type du statut est invalide",
  }).optional(),
});

export { registerUserSchema, loginUserSchema, updateUserSchema };
