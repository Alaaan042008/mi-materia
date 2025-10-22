import React, { useState } from "react";
import { StyleSheet, TextInput, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { z } from "zod";

// 🧠 Esquema de validación con Zod
const userSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .regex(/^[A-Za-z0-9.,;]+$/, "Solo se permiten letras, números, puntos y comas"),
  phone: z
    .string()
    .regex(/^\+?\d{7,15}$/, "Número inválido. Usa formato internacional, ej: +593987654321"),
});

export default function TextField() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Record<string, string | null>>({});

  // ✅ Validar campo individualmente sin usar pick()
  const validateField = (field: keyof typeof formData, value: string) => {
    let schema;

    switch (field) {
      case "name":
        schema = userSchema.shape.name;
        break;
      case "email":
        schema = userSchema.shape.email;
        break;
      case "password":
        schema = userSchema.shape.password;
        break;
      case "phone":
        schema = userSchema.shape.phone;
        break;
      default:
        return;
    }

    const result = schema.safeParse(value);
    setErrors({
      ...errors,
      [field]: result.success ? null : result.error.issues[0].message,
    });
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    validateField(field, value);
  };

  const handleSubmit = () => {
    const result = userSchema.safeParse(formData);
    if (result.success) {
      alert("✅ Datos válidos, formulario enviado correctamente!");
    } else {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const key = err.path[0].toString();
        newErrors[key] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulario de Registro</Text>

      <View style={styles.inputGroup}>
        <TextInput
          style={[styles.input, errors.name && styles.inputError]}
          placeholder="Nombre completo"
          value={formData.name}
          onChangeText={(v) => handleChange("name", v)}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          style={[styles.input, styles.inputLarge, errors.email && styles.inputError]}
          placeholder="Correo electrónico"
          value={formData.email}
          onChangeText={(v) => handleChange("email", v)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          style={[styles.input, errors.password && styles.inputError]}
          placeholder="Contraseña"
          value={formData.password}
          onChangeText={(v) => handleChange("password", v)}
          secureTextEntry
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          style={[styles.input, errors.phone && styles.inputError]}
          placeholder="Número telefónico ejemplo:+593969388342"
          value={formData.phone}
          onChangeText={(v) => handleChange("phone", v)}
          keyboardType="phone-pad"
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#101010",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },
  inputGroup: {
    width: "100%",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#1E1E1E",
    color: "#fff",
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  inputLarge: {
    height: 50, // 👈 campo email más grande
  },
  inputError: {
    borderColor: "#ff4d4d",
  },
  errorText: {
    color: "#ff4d4d",
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#4B9EFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: "#4B9EFF",
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
