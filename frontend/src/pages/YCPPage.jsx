// File: frontend/src/pages/YCPPage.jsx
import React from 'react';
import { PlayCircle, Clock, Users, Award, BookOpen, Star, CheckCircle, ArrowRight } from 'lucide-react';

const YCPPage = () => {
  const learningPaths = [
    {
      id: 1,
      title: "Self-Paced Learning",
      duration: "6 Weeks",
      price: "KSH 2,500",
      popular: false,
      features: [
        "Digital constitution guide access",
        "Self-assessment quizzes", 
        "Community forum participation",
        "Certificate of completion",
        "Lifetime resource access"
      ]
    },
    {
      id: 2,
      title: "Online Classes",
      duration: "8 Weeks",
      price: "KSH 3,500",
      popular: true,
      features: [
        "Live weekly sessions with experts",
        "Interactive group discussions",
        "Personalized mentorship",
        "Real-time Q&A sessions",
        "Digital resources & certificate"
      ]
    },
    {
      id: 3,
      title: "Physical Classes",
      duration: "12 Weeks",
      price: "KSH 5,000",
      popular: false,
      features: [
        "In-person interactive sessions",
        "Hands-on civic activities",
        "Guest speaker sessions",
        "Field trips to government institutions",
        "Premium materials & certificate"
      ]
    }
  ];

  const curriculumTopics = [
    {
      title: "Teens, the Law & Society",
      description: "Understanding your place in Kenya's legal framework and society",
      lessons: ["Constitutional Basics", "Rights & Responsibilities", "Legal Processes"],
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Citizenship & Personal Development", 
      description: "Building character and understanding what it means to be a Kenyan citizen",
      lessons: ["National Values", "Personal Ethics", "Character Building"],
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Leadership and Volunteerism",
      description: "Developing leadership skills and understanding community service",
      lessons: ["Leadership Styles", "Community Service", "Project Management"],
      color: "from-pink-500 to-purple-500"
    },
    {
      title: "Human Rights & Children Participation",
      description: "Understanding your rights and how to participate in democracy",
      lessons: ["Children's Rights", "Participation Methods", "Advocacy Basics"],
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Government and Public Service",
      description: "How government works and opportunities for public service",
      lessons: ["Government Structure", "Public Service", "Policy Making"],
      color: "from-indigo-500 to-purple-600"
    }
  ];

  return (
    <div className="bg-white text-gray-900">
      {/* SOPHISTICATED HERO SECTION */}
      <section className="pt-20 pb-20 bg-gradient-to-br from-blue-600 via-purple-700 to-pink-600 relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400 rounded-full opacity-10 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="mb-8">
            <span 
              className="bg-yellow-400 text-black px-6 py-2 font-bold text-sm tracking-wider uppercase rounded-full"
              style={{fontFamily: 'Space Grotesk, sans-serif'}}
            >
              Flagship Program
            </span>
          </div>

          <h1 
            className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            Young Citizens
            <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">Program</span>
          </h1>
          
          <div className="max-w-4xl mx-auto">
            <p 
              className="text-xl md:text-2xl font-medium text-white/90 mb-12 leading-relaxed"
              style={{fontFamily: 'Inter, sans-serif'}}
            >
              Empowering the next generation with constitutional knowledge, leadership skills, 
              and civic engagement. Join <strong className="text-yellow-300">2,500+ young Kenyans</strong> making 
              a measurable difference in their communities.
            </p>
          </div>

          {/* Professional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div 
                className="text-3xl font-black text-yellow-300 mb-2"
                style={{fontFamily: 'Playfair Display, serif'}}
              >
                2,500+
              </div>
              <p className="text-white/90 font-semibold">Students Empowered</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div 
                className="text-3xl font-black text-yellow-300 mb-2"
                style={{fontFamily: 'Playfair Display, serif'}}
              >
                100%
              </div>
              <p className="text-white/90 font-semibold">Satisfaction Rate</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div 
                className="text-3xl font-black text-yellow-300 mb-2"
                style={{fontFamily: 'Playfair Display, serif'}}
              >
                10+
              </div>
              <p className="text-white/90 font-semibold">Partner Schools</p>
            </div>
          </div>

          {/* Professional Call to Action */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-black px-10 py-4 text-lg tracking-wide transition-all transform hover:scale-105 rounded-lg">
              ENROLL TODAY
            </button>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-black px-10 py-4 text-lg tracking-wide transition-all border border-white/30 rounded-lg">
              DOWNLOAD BROCHURE
            </button>
          </div>
        </div>
      </section>

      {/* PROFESSIONAL LEARNING PATHS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-black text-gray-900 mb-6"
              style={{fontFamily: 'Playfair Display, serif'}}
            >
              Choose Your Learning Path
            </h2>
            <p 
              className="text-xl text-gray-600 font-medium max-w-3xl mx-auto"
              style={{fontFamily: 'Inter, sans-serif'}}
            >
              Flexible learning options designed to fit your schedule and learning preferences. 
              All paths lead to the same comprehensive constitutional education.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {learningPaths.map((path) => (
              <div 
                key={path.id}
                className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative ${
                  path.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''
                }`}
              >
                {path.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 font-bold text-sm rounded-full">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 
                    className="text-2xl font-black text-gray-900 mb-3"
                    style={{fontFamily: 'Space Grotesk, sans-serif'}}
                  >
                    {path.title}
                  </h3>
                  
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600 font-semibold">{path.duration}</span>
                  </div>
                  
                  <div 
                    className={`text-4xl font-black mb-4 ${
                      path.popular ? 'text-blue-600' : 'text-gray-900'
                    }`}
                    style={{fontFamily: 'Playfair Display, serif'}}
                  >
                    {path.price}
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {path.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-4 font-black text-lg tracking-wide transition-all rounded-lg ${
                  path.popular 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white' 
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                }`}>
                  GET STARTED
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOPHISTICATED CURRICULUM SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-black text-gray-900 mb-6"
              style={{fontFamily: 'Playfair Display, serif'}}
            >
              Comprehensive Curriculum
            </h2>
            <p 
              className="text-xl text-gray-600 font-medium max-w-3xl mx-auto"
              style={{fontFamily: 'Inter, sans-serif'}}
            >
              Five core modules designed to build deep constitutional knowledge and 
              practical civic engagement skills.
            </p>
          </div>

          <div className="grid gap-6">
            {curriculumTopics.map((topic, index) => (
              <div 
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center mr-4`}>
                        <span className="text-xl font-black text-white">{index + 1}</span>
                      </div>
                      <h3 
                        className="text-2xl font-black text-gray-900"
                        style={{fontFamily: 'Space Grotesk, sans-serif'}}
                      >
                        {topic.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 font-medium mb-6 text-lg leading-relaxed">{topic.description}</p>
                    
                    <div className="flex flex-wrap gap-3">
                      {topic.lessons.map((lesson, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold text-sm">
                          {lesson}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex-shrink-0 ml-6">
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-4 rounded-xl transition-all group-hover:bg-blue-100 group-hover:text-blue-600">
                      <ArrowRight size={24} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROFESSIONAL OUTCOMES SECTION */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <h2 
                className="text-4xl md:text-5xl font-black text-white mb-8"
                style={{fontFamily: 'Playfair Display, serif'}}
              >
                Program Outcomes
              </h2>
              
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                  <h3 
                    className="text-xl font-black text-yellow-300 mb-3"
                    style={{fontFamily: 'Space Grotesk, sans-serif'}}
                  >
                    Constitutional Mastery
                  </h3>
                  <p className="text-white/90 font-medium">Comprehensive understanding of Kenya's Constitution, legal processes, and civic institutions.</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                  <h3 
                    className="text-xl font-black text-blue-300 mb-3"
                    style={{fontFamily: 'Space Grotesk, sans-serif'}}
                  >
                    Leadership Development
                  </h3>
                  <p className="text-white/90 font-medium">Practical leadership skills and understanding of civic responsibility and community engagement.</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                  <h3 
                    className="text-xl font-black text-pink-300 mb-3"
                    style={{fontFamily: 'Space Grotesk, sans-serif'}}
                  >
                    Civic Confidence
                  </h3>
                  <p className="text-white/90 font-medium">Knowledge and confidence to participate meaningfully in democratic processes and advocacy.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-10 rounded-2xl">
              <div className="text-center">
                <h3 
                  className="text-3xl font-black text-white mb-6"
                  style={{fontFamily: 'Space Grotesk, sans-serif'}}
                >
                  Join Our Community
                </h3>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <div className="text-4xl font-black text-yellow-300 mb-2">2,500+</div>
                    <div className="text-white/90 font-semibold">Alumni Network</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-yellow-300 mb-2">95%</div>
                    <div className="text-white/90 font-semibold">Completion Rate</div>
                  </div>
                </div>

                <div className="flex justify-center mb-6">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className="w-6 h-6 text-yellow-300 fill-current" />
                  ))}
                </div>
                
                <p className="text-white/90 font-medium italic mb-6">
                  "This program transformed my understanding of my role as a young Kenyan citizen."
                </p>
                
                <div className="text-white/80 font-semibold">- Program Graduate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROFESSIONAL CTA SECTION */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 to-orange-500">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 
            className="text-5xl font-black text-gray-900 mb-6"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            Ready to Lead the Change?
          </h2>
          <p 
            className="text-xl font-semibold text-gray-900/80 mb-10"
            style={{fontFamily: 'Inter, sans-serif'}}
          >
            Join thousands of young Kenyans building a better future through informed citizenship.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-12 py-4 font-black text-xl tracking-wide transition-all rounded-lg">
              ENROLL NOW
            </button>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-gray-900 border-2 border-gray-900/20 px-12 py-4 font-black text-xl tracking-wide transition-all rounded-lg">
              SCHEDULE CONSULTATION
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default YCPPage;