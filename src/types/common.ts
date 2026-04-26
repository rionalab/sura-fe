import React from 'react'

export type WithoutId<T> = Omit<T, 'id'>
export interface ReactChildren {
   children: React.ReactNode
}
