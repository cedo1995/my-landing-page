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
      slug: 'corso-base',
      titleKey: 'courses.corsoBase.title',
      descriptionKey: 'courses.corsoBase.description',
      price: '€400',
      moduleKeys: [
        { key: 'courses.corsoBase.modules.m1', number: 1 },
        { key: 'courses.corsoBase.modules.m2', number: 2 },
        { key: 'courses.corsoBase.modules.m3', number: 3 },
        { key: 'courses.corsoBase.modules.m4', number: 4 },
        { key: 'courses.corsoBase.modules.m5', number: 5 },
      ],
    },
    {
      slug: 'approfondimento-bitcoin',
      titleKey: 'courses.approfondimentoBitcoin.title',
      descriptionKey: 'courses.approfondimentoBitcoin.description',
      price: '€800',
      moduleKeys: [
        { key: 'courses.approfondimentoBitcoin.modules.m1', number: 1 },
        { key: 'courses.approfondimentoBitcoin.modules.m2', number: 2 },
        { key: 'courses.approfondimentoBitcoin.modules.m3', number: 3 },
        { key: 'courses.approfondimentoBitcoin.modules.m4', number: 4 },
        { key: 'courses.approfondimentoBitcoin.modules.m5', number: 5 },
        { key: 'courses.approfondimentoBitcoin.modules.m6', number: 6 },
        { key: 'courses.approfondimentoBitcoin.modules.m7', number: 7 },
        { key: 'courses.approfondimentoBitcoin.modules.m8', number: 8 },
        { key: 'courses.approfondimentoBitcoin.modules.m9', number: 9 },
        { key: 'courses.approfondimentoBitcoin.modules.m10', number: 10 },
      ],
    },
  ]

  return { courses }
}
