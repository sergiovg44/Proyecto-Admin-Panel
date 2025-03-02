const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      validate: {
        validator: function (value) {
          return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value);
        },
        message:
          "El nombre no puede contener números ni caracteres especiales.",
      },
      trim: true,
    },

    apellidos: {
      type: String,
      required: [true, "El apellido es obligatorio"],
      validate: {
        validator: function (value) {
          return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value);
        },
        message:
          "El apellido no puede contener números ni caracteres especiales.",
      },
      trim: true,
    },

    fechaNacimiento: {
      type: String,
      required: [true, "La fecha de nacimiento es obligatoria"],
      validate: {
        validator: function (value) {
          return /^\d{2}\/\d{2}\/\d{4}$/.test(value);
        },
        message:
          "La fecha de nacimiento debe de tener este formato dd/mm/yyyy.",
      },
    },

    usuario: {
      type: String,
      required: [true, "El nombre de usuario es obligatorio"],
      minLength: [5, "Minimo 5 caracteres en el usuario"],
      validate: {
        validator: function (value) {
          return /^[^.,\s]+$/.test(value);
        },
        message: "El usuario no puede contener (.)(,) ni espacios.",
      },
      trim: true,
    },
    email: {
      type: String,
      required: [true, "El correo electrónico es obligatorio"],
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "El email tiene que contener el @.",
      },
      trim: true,
      unique: true,
    },

    contraseña: {
      type: String,
      minLength: [6, "La contraseña debe contener minimo 6 caracteres"],
      required: [true, "La contraseña es obligatoria"],
    },

    telefono: {
      type: String,
      required: [true, "El teléfono es obligatorio"],
      trim: true,
    },

    codigoPostal: {
      type: String,
      required: [true, "El código postal es obligatorio"],
    },

    pais: {
      type: String,
      required: [true, "El país es obligatorio"],
      trim: true,
    },

    provincia: {
      type: String,
      required: [true, "La provincia es obligatoria"],
      trim: true,
    },

    municipio: {
      type: String,
      required: [true, "El municipio es obligatorio"],
      trim: true,
    },

    direccion: {
      type: String,
      required: [true, "La dirección es obligatoria"],
      trim: true,
    },

    rol: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    estadoSuscripcion: {
      type: Boolean,
      default: true,
    },

    fechaInicioSuscripcion: {
      type: Date,
      default: Date.now(),
    },
    fechaFinSuscripcion: {
      type: Date,

      default: () => {
        const now = new Date();
        now.setFullYear(now.getFullYear() + 1);
        return now;
      },
    },
  },
  { timestamps: true }
);

const UsersModel = mongoose.model("Users", usersSchema, "users");

module.exports = UsersModel;

