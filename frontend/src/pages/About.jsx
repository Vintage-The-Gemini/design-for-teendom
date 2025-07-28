import React from 'react';
import { Target, Eye, Heart, Users, BookOpen, Award, ArrowRight } from 'lucide-react';

const About = () => {
  const stats = [
    { number: '11.6M', label: 'Target Young People (10-19yrs)', icon: '👥' },
    { number: '2,500+', label: 'Students Reached', icon: '🎓' },
    { number: '1,500+', label: 'Constitution Guides Distributed', icon: '📚' },
    { number: '10+', label: 'Schools Engaged', icon: '🏫' }
  ];

  const values = [
    {
      icon: BookOpen,
      title: 'Education First',
      description: 'We believe quality constitutional education is the foundation of active citizenship'
    },
    {
      icon: Users,
      title: 'Youth Empowerment',
      description: 'Empowering young people with knowledge, skills, and platforms to participate meaningfully'
    },
    {
      icon: Heart,
      title: 'Community Impact',
      description: 'Creating positive change that ripples through families, schools, and communities'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Maintaining high standards in all our programs and educational materials'
    }
  ];

  const team = [
    {
      name: 'Sandra Ochola',
      role: 'Founder & Executive Director',
      image: '👩‍💼',
      bio: 'Author of "Teens Guide to the Constitution of Kenya" and passionate advocate for youth constitutional education.'
    },
    {
      name: 'Program Team',
      role: 'Education Specialists',
      image: '👨‍🏫',
      bio: 'Experienced educators and constitutional experts dedicated to making learning engaging and impactful.'
    },
    {
      name: 'Community Partners',
      role: 'School Coordinators',
      image: '🤝',
      bio: 'Teachers and youth workers from partner schools helping us reach more young people across Kenya.'
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-teen-blue/20 to-teen-purple/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-teen-yellow to-teen-orange text-white px-6 py-2 rounded-full font-bold mb-6 animate-bounce">
              🌟 About Teendom Africa
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold font-display mb-6 leading-tight">
              <span className="gradient-text">EMPOWERING</span><br/>
              <span className="text-gray-800">YOUNG</span><br/>
              <span className="gradient-text">CITIZENS</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto">
              We are a social enterprise dedicated to developing informed and active citizenship among 
              Kenyan teenagers and young adults through constitutional education, mentorship, and recognition.
            </p>

            {/* Impact Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className="text-2xl font-bold text-teen-blue mb-2">{stat.number}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Mission */}
            <div className="text-center lg:text-left">
              <div className="w-20 h-20 bg-gradient-to-r from-teen-pink to-teen-purple rounded-2xl flex items-center justify-center mb-6 mx-auto lg:mx-0">
                <Target size={40} className="text-white" />
              </div>
              <h2 className="text-4xl font-bold font-display gradient-text mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To transform the lives of young people through educational resources and mentorship, 
                equipping them with the knowledge, skills, and values needed to shape a better future 
                for themselves and their communities.
              </p>
            </div>

            {/* Vision */}
            <div className="text-center lg:text-left">
              <div className="w-20 h-20 bg-gradient-to-r from-teen-blue to-teen-green rounded-2xl flex items-center justify-center mb-6 mx-auto lg:mx-0">
                <Eye size={40} className="text-white" />
              </div>
              <h2 className="text-4xl font-bold font-display gradient-text mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To be a leading social enterprise for empowering young people in Kenya to develop 
                into a community of informed and active citizens who understand their rights, 
                use their voices responsibly, and contribute to the betterment of our societies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem We're Solving */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display gradient-text mb-6">
              The Challenge We Address
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-teen-pink/20 to-teen-purple/20 rounded-3xl p-8">
              <h3 className="text-2xl font-bold font-display text-gray-800 mb-6">The Problem</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teen-pink rounded-full mt-3"></div>
                  <p className="text-gray-700">
                    <span className="font-bold text-teen-pink">11.6 million</span> teenagers and young adults 
                    have limited access to law-related and constitutional education
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teen-purple rounded-full mt-3"></div>
                  <p className="text-gray-700">
                    This makes them vulnerable to <span className="font-semibold">harm and exploitation</span>
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teen-pink rounded-full mt-3"></div>
                  <p className="text-gray-700">
                    Increases risk of <span className="font-semibold">delinquency and criminal behavior</span>
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teen-purple rounded-full mt-3"></div>
                  <p className="text-gray-700">
                    Limits meaningful engagement in <span className="font-semibold">nation building</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-teen-blue/20 to-teen-green/20 rounded-3xl p-8">
              <h3 className="text-2xl font-bold font-display text-gray-800 mb-6">Our Solution</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teen-blue rounded-full mt-3"></div>
                  <p className="text-gray-700">
                    <span className="font-semibold">Constitutional education</span> that's engaging and accessible
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teen-green rounded-full mt-3"></div>
                  <p className="text-gray-700">
                    <span className="font-semibold">Multiple learning formats</span> to suit different needs
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teen-blue rounded-full mt-3"></div>
                  <p className="text-gray-700">
                    <span className="font-semibold">Recognition and celebration</span> of teen achievements
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teen-green rounded-full mt-3"></div>
                  <p className="text-gray-700">
                    Building a <span className="font-semibold">community of active citizens</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display gradient-text mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-r from-teen-yellow to-teen-orange rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:animate-wiggle">
                    <IconComponent size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-gray-800 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-gradient-to-br from-teen-purple/10 to-teen-pink/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display gradient-text mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              Passionate individuals dedicated to empowering Kenya's youth
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all text-center">
                <div className="text-6xl mb-6">{member.image}</div>
                <h3 className="text-xl font-bold font-display text-gray-800 mb-2">{member.name}</h3>
                <p className="text-teen-blue font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display gradient-text mb-6">
              Our Impact So Far
            </h2>
          </div>

          <div className="bg-gradient-to-br from-teen-blue/20 to-teen-purple/20 rounded-3xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-3xl font-bold font-display text-gray-800 mb-8">What We've Achieved</h3>
                <div className="space-y-6">
                  {[
                    '✅ Reached 2,500+ teenagers and young adults',
                    '✅ Distributed 1,500+ copies of Constitution Guide',
                    '✅ Engaged 10+ schools in Nairobi County',
                    '✅ Participated in major events like Child Justice Summit',
                    '✅ Featured at People Dialogue Festival 2025',
                    '✅ Built partnerships with prestigious schools like Alliance High School'
                  ].map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <span className="text-lg">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-bold font-display text-gray-800 mb-8">Our 2025 Goals</h3>
                <div className="space-y-6">
                  {[
                    '🎯 Reach 10,000+ more students',
                    '🎯 Expand to neighboring counties',
                    '🎯 Train 47+ teen facilitators',
                    '🎯 Launch Teendom Awards',
                    '🎯 Start 18+ teen clubs',
                    '🎯 Host 270+ sponsorships for YCP classes'
                  ].map((goal, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <span className="text-lg">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-teen-blue to-teen-purple">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold font-display text-white mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Help us build a generation of informed, active, and empowered young citizens. 
            Together, we can shape Kenya's future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teen-blue px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all inline-flex items-center space-x-2">
              <span>🤝 Become a Partner</span>
              <ArrowRight size={20} />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-teen-blue transition-all">
              📞 Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;