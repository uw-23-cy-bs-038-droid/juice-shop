/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import type { BasketItemModel } from 'models/basketitem'
import type { ChallengeKey, ChallengeModel } from 'models/challenge'
import type { ComplaintModel } from 'models/complaint'
import type { FeedbackModel } from 'models/feedback'
import type { ProductModel } from 'models/product'
import type { BasketModel } from 'models/basket'
import type { UserModel } from 'models/user'

/* jslint node: true */

// -----------------------------------
// Shared state (secured & read-only)
// -----------------------------------

export const challenges = Object.freeze({}) as Readonly<Record<ChallengeKey, ChallengeModel>>
export const users = Object.freeze({}) as Readonly<Record<string, UserModel>>
export const products = Object.freeze({}) as Readonly<Record<string, ProductModel>>
export const feedback = Object.freeze({}) as Readonly<Record<string, FeedbackModel>>
export const baskets = Object.freeze({}) as Readonly<Record<string, BasketModel>>
export const basketItems = Object.freeze({}) as Readonly<Record<string, BasketItemModel>>
export const complaints = Object.freeze({}) as Readonly<Record<string, ComplaintModel>>

// -----------------------------------
// Notifications (kept mutable intentionally)
// -----------------------------------

export interface Notification {
  key: string
  name: string
  challenge: string
  flag: string
  hidden: boolean
  isRestore: boolean
}

export const notifications: Notification[] = []

// -----------------------------------
// Secure getter/setter for blueprint file
// -----------------------------------

// private mutable state (NOT exported)
let _retrieveBlueprintChallengeFile: string | null = null

export function getRetrieveBlueprintChallengeFile(): string | null {
  return _retrieveBlueprintChallengeFile
}

export function setRetrieveBlueprintChallengeFile(value: string): void {
  // SECURITY: sanitize / normalize path-like input to avoid directory traversal
  if (typeof value !== 'string') {
    throw new TypeError('Blueprint challenge file must be a string.')
  }

  // OPTIONAL: security rule — disallow relative traversal
  if (value.includes('..')) {
    throw new Error('Invalid file path.')
  }

  _retrieveBlueprintChallengeFile = value
}
