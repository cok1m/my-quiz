import is from 'is_js'

export const createFormControl = (config, validation) => {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    value: ''
  }
}

export const validateControl = (value, validation = null) => {
  if (!validation) {
    return true
  }

  let isValid = true
  if (validation.required) {
    isValid = value.trim() !== '' && isValid
  }

  if (validation.email) {
    isValid = is.email(value) && isValid
  }

  if (validation.minLength) {
    isValid = value.length >= validation.minLength && isValid
  }

  return isValid
}

export const validateForm = formControls => {
  let isFormValid = true

  for (let control in formControls) {
    if (formControls.hasOwnProperty(control)) {
      isFormValid = formControls[control].valid && isFormValid
    }
  }

  return isFormValid
}