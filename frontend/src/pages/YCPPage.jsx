// File: frontend/src/pages/YCPPage.jsx
import React from 'react';
import { PlayCircle, Clock, Users, Award, BookOpen, Star } from 'lucide-react';

const YCPPage = () => {
  const learningPaths = [
    {
      id: 1,
      title: "SELF-PACED LEARNING",
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
      title: "ONLINE CLASSES",
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
      title: "PHYSICAL CLASSES",
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
      lessons: ["Constitutional Basics", "Rights & Responsibilities", "Legal Processes"]
    },
    {
      title: "Citizenship & Personal Development", 
      description: "Building character and understanding what it means to be a Kenyan citizen",
      lessons: ["National Values", "Personal Ethics", "Character Building"]
    },
    {
      title: "Leadership and Volunteerism",
      description: "Developing leadership skills and understanding community service",
      lessons: ["Leadership Styles", "Community Service", "Project Management"]
    },
    {
      title: "Human Rights & Children Participation",
      description: "Understanding your rights and how to participate in democracy",
      lessons: ["Children's Rights", "Participation Methods", "Advocacy Basics"]
    },
    {
      title: "Government and Public Service",
      description: "How government works and opportunities for public service",
      lessons: ["Government Structure", "Public Service", "Policy Making"]
    }
  ];

  return (
    <div className="bg-white text-gray-900">
      {/* VIBRANT HERO SECTION - YCP Logo Colors */}
      <section className="pt-20 pb-20 bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 relative overflow-hidden">
        {/* Colorful Background Decorations */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-400 rounded-full opacity-30 animate-float"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-400 rounded-full opacity-25 animate-bounce"></div>
        <div className="absolute top-60 right-1/4 w-28 h-28 bg-orange-400 rounded-full opacity-20"></div>
        
        <div className="max-w-7xl mx-auto px-6 text-center relative">
          <h1 
            className="text-6xl md:text-8xl font-black text-white mb-8 leading-none tracking-tight drop-shadow-lg"
            style={{fontFamily: 'Fredoka One, cursive'}}
          >
            YOUNG
            <br/>
            <span className="text-blue-600 drop-shadow-xl">CITIZENS</span>
            <br/>
            <span className="text-yellow-300 drop-shadow-xl">PROGRAM</span>
          </h1>
          
          <div className="max-w-4xl mx-auto">
            <p 
              className="text-xl md:text-2xl font-bold text-white mb-12 leading-relaxed drop-shadow-md"
              style={{fontFamily: 'Inter, sans-serif'}}
            >
              🚀 Shaping Our Future! Empowering teens with constitutional knowledge, 
              leadership skills, and civic engagement. Join 2,500+ young Kenyans 
              making a difference! 🇰🇪
            </p>
          </div>

          {/* Energetic Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-blue-500 p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all">
              <div 
                className="text-4xl font-black text-white mb-2"
                style={{fontFamily: 'Fredoka One, cursive'}}
              >
                2,500+ 🎉
              </div>
              <p className="text-white font-bold">TEENS EMPOWERED!</p>
            </div>
            
            <div className="bg-pink-500 p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all">
              <div 
                className="text-4xl font-black text-white mb-2"
                style={{fontFamily: 'Fredoka One, cursive'}}
              >
                100% ✨
              </div>
              <p className="text-white font-bold">SATISFACTION RATE!</p>
            </div>
            
            <div className="bg-yellow-500 p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all">
              <div 
                className="text-4xl font-black text-white mb-2"
                style={{fontFamily: 'Fredoka One, cursive'}}
              >
                10+ 🏫
              </div>
              <p className="text-white font-bold">SCHOOLS REACHED!</p>
            </div>
          </div>

          {/* Fun Call to Action */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-black px-12 py-6 text-xl tracking-widest transition-all transform hover:scale-110 rounded-full shadow-2xl">
              🚀 ENROLL NOW!
            </button>
            <button className="bg-white hover:bg-gray-100 text-blue-600 font-black px-12 py-6 text-xl tracking-widest transition-all transform hover:scale-110 rounded-full shadow-2xl">
              📚 LEARN MORE
            </button>
          </div>
        </div>
      </section>

      {/* COLORFUL LEARNING PATHS */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <h2 
              className="text-5xl font-black text-gray-900 mb-6 leading-tight"
              style={{fontFamily: 'Fredoka One, cursive'}}
            >
              CHOOSE YOUR 
              <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-pink-600 to-orange-600">ADVENTURE!</span>
            </h2>
            <p 
              className="text-xl text-gray-700 font-bold"
              style={{fontFamily: 'Poppins, sans-serif'}}
            >
              🎯 PICK THE LEARNING STYLE THAT FITS YOUR VIBE! 🔥
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {learningPaths.map((path) => (
              <div 
                key={path.id}
                className={`bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 relative transform hover:scale-105 ${
                  path.popular ? 'ring-4 ring-pink-500 bg-gradient-to-br from-pink-50 to-yellow-50' : ''
                }`}
              >
                {path.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 font-black text-sm rounded-full shadow-lg">
                    ⭐ MOST POPULAR! ⭐
                  </div>
                )}
                
                <h3 
                  className="text-2xl font-black text-gray-900 mb-4 text-center"
                  style={{fontFamily: 'Fredoka One, cursive'}}
                >
                  {path.title}
                </h3>
                
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 font-bold">{path.duration}</span>
                  </div>
                  
                  <div 
                    className={`text-4xl font-black mb-2 ${
                      path.popular ? 'text-pink-600' : 'text-blue-600'
                    }`}
                    style={{fontFamily: 'Fredoka One, cursive'}}
                  >
                    {path.price}
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {path.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <span className="text-green-500 font-black mt-1 text-lg">✓</span>
                      <span className="text-gray-700 font-medium leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-4 font-black text-lg tracking-wider transition-all transform hover:scale-105 rounded-xl shadow-lg ${
                  path.popular 
                    ? 'bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                }`}>
                  🚀 ENROLL NOW!
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COLORFUL CURRICULUM SECTION */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <h2 
              className="text-5xl font-black text-white mb-6 drop-shadow-lg"
              style={{fontFamily: 'Fredoka One, cursive'}}
            >
              WHAT YOU'LL 
              <br/>
              <span className="text-yellow-300">DISCOVER! 🌟</span>
            </h2>
            <p 
              className="text-xl text-white/90 font-bold"
              style={{fontFamily: 'Poppins, sans-serif'}}
            >
              🎓 EXCITING TOPICS THAT WILL BLOW YOUR MIND! 🤯
            </p>
          </div>

          <div className="grid gap-6">
            {curriculumTopics.map((topic, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                        index % 4 === 0 ? 'bg-yellow-400' : 
                        index % 4 === 1 ? 'bg-pink-400' : 
                        index % 4 === 2 ? 'bg-blue-400' : 'bg-orange-400'
                      }`}>
                        <span className="text-2xl font-black text-white">{index + 1}</span>
                      </div>
                      <h3 
                        className="text-2xl font-black text-white"
                        style={{fontFamily: 'Fredoka One, cursive'}}
                      >
                        {topic.title.toUpperCase()}
                      </h3>
                    </div>
                    
                    <p className="text-white/90 font-medium mb-4 text-lg">{topic.description}</p>
                    
                    <div className="flex flex-wrap gap-3">
                      {topic.lessons.map((lesson, idx) => (
                        <span key={idx} className="bg-white/20 text-white px-4 py-2 rounded-full font-semibold text-sm backdrop-blur-sm">
                          {lesson}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex-shrink-0 ml-6">
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-black p-4 rounded-full transition-all transform hover:scale-110 shadow-lg">
                      <PlayCircle size={24} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUPER COLORFUL BENEFITS SECTION */}
      <section className="py-20 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-8">
              <h2 
                className="text-5xl font-black text-white drop-shadow-lg"
                style={{fontFamily: 'Fredoka One, cursive'}}
              >
                AMAZING THINGS 
                <br/>
                <span className="text-blue-600">YOU'LL GAIN! 🎁</span>
              </h2>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all">
                  <h3 
                    className="text-2xl font-black text-blue-600 mb-3"
                    style={{fontFamily: 'Fredoka One, cursive'}}
                  >
                    🧠 SUPER UNDERSTANDING
                  </h3>
                  <p className="text-gray-700 font-medium">Kenya's social, political, cultural and economic history will be crystal clear!</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all">
                  <h3 
                    className="text-2xl font-black text-pink-600 mb-3"
                    style={{fontFamily: 'Fredoka One, cursive'}}
                  >
                    🎯 GREATER PURPOSE
                  </h3>
                  <p className="text-gray-700 font-medium">Appreciation of your rights, roles and responsibilities as young citizens</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all">
                  <h3 
                    className="text-2xl font-black text-orange-600 mb-3"
                    style={{fontFamily: 'Fredoka One, cursive'}}
                  >
                    📚 CONSTITUTIONAL WISDOM
                  </h3>
                  <p className="text-gray-700 font-medium">Increased knowledge on the Constitution of Kenya, 2010 and law making processes</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-3xl shadow-2xl">
              <h3 
                className="text-3xl font-black text-white mb-6 text-center"
                style={{fontFamily: 'Fredoka One, cursive'}}
              >
                🎉 JOIN 2,500+ AMAZING STUDENTS! 🎉
              </h3>
              <div className="text-center space-y-4">
                <div className="text-8xl font-black text-yellow-300 animate-bounce" style={{fontFamily: 'Fredoka One, cursive'}}>
                  100%
                </div>
                <p className="text-white font-bold text-2xl">SATISFACTION RATE! 🌟</p>
                <div className="flex justify-center space-x-2 mt-6">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className="w-8 h-8 text-yellow-300 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPLOSIVE CTA SECTION */}
      <section className="py-20 bg-gradient-to-br from-pink-500 via-purple-600 to-blue-600 relative overflow-hidden">
        {/* Fun Background Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-orange-400 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-pink-400 rounded-full opacity-35 animate-bounce"></div>
        
        <div className="max-w-6xl mx-auto text-center px-8 relative">
          <h2 
            className="text-6xl font-black text-white mb-8 leading-none tracking-tight drop-shadow-lg"
            style={{fontFamily: 'Fredoka One, cursive'}}
          >
            READY TO BECOME AN
            <br/>
            <span className="text-yellow-300">EMPOWERED CITIZEN?</span>
            <br/>
            🚀✨
          </h2>
          <p 
            className="text-2xl font-bold text-white/90 mb-12 tracking-wide"
            style={{fontFamily: 'Poppins, sans-serif'}}
          >
            🔥 JOIN THOUSANDS OF YOUNG KENYANS MAKING A DIFFERENCE! 🇰🇪
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-16 py-6 font-black text-2xl tracking-widest transition-all transform hover:scale-110 rounded-full shadow-2xl">
              🎯 ENROLL TODAY!
            </button>
            <button className="bg-white hover:bg-gray-100 text-purple-600 px-16 py-6 font-black text-2xl tracking-widest transition-all transform hover:scale-110 rounded-full shadow-2xl">
              📞 GET MORE INFO
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default YCPPage;