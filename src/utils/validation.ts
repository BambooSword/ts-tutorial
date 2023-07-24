// Validation
export interface Validatable {
  value: string | number
  required?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
}

export function validate(validatableInput: Validatable) {
  let isValid = true
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0
  }
  if (
    typeof validatableInput.minLength === 'number' &&
    typeof validatableInput.value === 'string'
  ) {
    isValid =
      isValid &&
      validatableInput.value.trim().length >= validatableInput.minLength
  }
  if (
    typeof validatableInput.maxLength === 'number' &&
    typeof validatableInput.value === 'string'
  ) {
    isValid =
      isValid &&
      validatableInput.value.trim().length <= validatableInput.maxLength
  }
  if (
    typeof validatableInput.value === 'number' &&
    typeof validatableInput.max === 'number'
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max
  }
  if (
    typeof validatableInput.value === 'number' &&
    typeof validatableInput.min === 'number'
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min
  }
  return isValid
}
