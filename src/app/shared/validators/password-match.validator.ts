import { FormGroup, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Validador personalizado para comprobar que los campos de contraseña y confirmación coincidan.
 * Se aplica a un FormGroup.
 */
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  // Asegúrate de que el control sea un FormGroup
  if (!(control instanceof FormGroup)) {
    return null;
  }

  // Obtener los controles de los campos (los nombres deben coincidir con tu formulario)
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  // Si los controles no existen o la contraseña de confirmación está vacía, pasa la validación.
  if (!password || !confirmPassword || confirmPassword.value === '') {
    return null;
  }

  // Si no coinciden: Devuelve el error 'mismatch' al FormGroup.
  if (password.value !== confirmPassword.value) {
    // Nota: Eliminamos la manipulación directa de confirmPassword.setErrors()
    return { mismatch: true }; 
  }

  // Si coinciden: No devuelve nada (pasa la validación).
  return null;
};