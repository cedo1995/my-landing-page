export interface CourseModule {
  key: string
  number: number
}

export interface Course {
  slug: string
  titleKey: string
  descriptionKey: string
  price: string
  moduleKeys: CourseModule[]
}

export function useCourses() {
  const courses: Course[] = [
    {
      slug: 'introduzione-bitcoin',
      titleKey: 'courses.introduzioneBitcoin.title',
      descriptionKey: 'courses.introduzioneBitcoin.description',
      price: '€400',
      moduleKeys: [
        { key: 'courses.introduzioneBitcoin.modules.m1', number: 1 },
        { key: 'courses.introduzioneBitcoin.modules.m2', number: 2 },
        { key: 'courses.introduzioneBitcoin.modules.m3', number: 3 },
        { key: 'courses.introduzioneBitcoin.modules.m4', number: 4 },
        { key: 'courses.introduzioneBitcoin.modules.m5', number: 5 },
      ],
    },
  ]

  return { courses }
}
