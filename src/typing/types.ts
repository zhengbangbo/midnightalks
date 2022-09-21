import type { Component } from 'vue'

export interface RawEpisode {
  id: string
  date: Date
  title: string
  hosts: string[]
  guests: string[]
  description: string
}

export interface Episode extends RawEpisode {
  default: Component
}
