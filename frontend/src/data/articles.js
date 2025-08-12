// File: src/data/articles.js

export const ARTICLE_CATEGORIES = {
  SELF_CARE: {
    name: 'Self-Care',
    color: 'bg-blue-500',
    textColor: 'text-blue-500',
    emoji: '🌟'
  },
  LEADERSHIP: {
    name: 'Leadership',
    color: 'bg-red-500', 
    textColor: 'text-red-500',
    emoji: '👑'
  },
  RELATIONSHIPS: {
    name: 'Relationships',
    color: 'bg-pink-500',
    textColor: 'text-pink-500', 
    emoji: '💕'
  },
  LIFESTYLE: {
    name: 'Lifestyle',
    color: 'bg-green-500',
    textColor: 'text-green-500',
    emoji: '🙏'
  },
  LAW_SOCIETY: {
    name: 'Law And Society',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-500',
    emoji: '⚖️'
  },
  MONEY: {
    name: 'Money',
    color: 'bg-orange-500',
    textColor: 'text-orange-500',
    emoji: '💰'
  },
  ENTREPRENEURSHIP: {
    name: 'Entrepreneurship',
    color: 'bg-purple-500',
    textColor: 'text-purple-500',
    emoji: '🚀'
  },
  MENTAL_HEALTH: {
    name: 'Mental Health',
    color: 'bg-indigo-500',
    textColor: 'text-indigo-500',
    emoji: '🧠'
  },
  CAREER: {
    name: 'Career',
    color: 'bg-teal-500',
    textColor: 'text-teal-500',
    emoji: '🎯'
  }
};

// Complete articles database based on your Word documents
export const ARTICLES = [
  // ========================
  // SELF-CARE CATEGORY
  // ========================
  {
    id: 1,
    slug: 'acne-and-male-self-esteem',
    title: 'ACNE AND MALE SELF ESTEEM',
    category: ARTICLE_CATEGORIES.SELF_CARE,
    date: 'Jun 29, 2025',
    author: 'Catherine Kinyanjui',
    excerpt: 'Understanding how acne affects teenage boys and building confidence through proper skincare and self-acceptance. A comprehensive guide to managing both physical and emotional aspects.',
    content: `
      Acne is one of the most common skin conditions affecting teenagers, particularly boys between the ages of 12-18. 
      While often dismissed as a "normal part of growing up," acne can have profound effects on a teenager's self-esteem 
      and mental health.

      **The Physical Reality**
      During puberty, hormonal changes cause increased oil production in the skin. This excess oil, combined with dead 
      skin cells and bacteria, creates the perfect environment for acne to develop. For boys, testosterone levels surge 
      during this time, often making acne more severe than in girls.

      **The Emotional Impact**
      Many teenage boys struggle with:
      - Reduced self-confidence
      - Social withdrawal
      - Anxiety about appearance
      - Depression in severe cases
      - Academic performance decline

      **Building Confidence Despite Acne**
      1. **Develop a Skincare Routine**: Gentle cleansing, appropriate treatments, and consistency
      2. **Focus on Internal Worth**: Remember that your value isn't determined by your appearance
      3. **Seek Support**: Talk to friends, family, or counselors about your feelings
      4. **Professional Help**: Consult a dermatologist for severe cases
      5. **Healthy Lifestyle**: Good diet, exercise, and sleep support skin health

      Remember: Acne is temporary, but the confidence you build while dealing with it lasts forever.
    `,
    image: '/assets/images/acne/acne1.jpg',
    images: [
      '/assets/images/acne/acne1.jpg',
      '/assets/images/acne/acne2.jpg'
    ],
    tags: ['skincare', 'self-esteem', 'teenage-boys', 'confidence', 'mental-health'],
    featured: true,
    views: 2500,
    comments: 45,
    readTime: 5
  },
  {
    id: 2,
    slug: 'body-odour-teen-guide',
    title: 'BODY ODOUR: A Teen\'s Complete Guide',
    category: ARTICLE_CATEGORIES.SELF_CARE,
    date: 'Jun 27, 2025',
    author: 'Health Team',
    excerpt: 'Everything teenagers need to know about managing body odour during puberty. Practical tips for staying fresh and confident.',
    content: `
      Body odour during teenage years is completely normal but can be managed effectively with the right knowledge and habits.

      **Why Teenagers Experience Body Odour**
      - Increased hormone production
      - More active sweat glands
      - Bacteria growth on skin
      - Physical activity and stress

      **Daily Hygiene Routine**
      1. **Morning Shower**: Use antibacterial soap
      2. **Deodorant/Antiperspirant**: Apply to clean, dry skin
      3. **Clean Clothes**: Fresh clothes daily, especially underwear
      4. **Evening Care**: Quick wash of face, underarms, and feet

      **Pro Tips for Staying Fresh**
      - Choose breathable fabrics like cotton
      - Keep extra deodorant in your school bag
      - Shower immediately after sports
      - Drink plenty of water
      - Eat a balanced diet (avoid excessive spicy foods)

      Remember: Good hygiene is a life skill that boosts confidence and social interactions.
    `,
    image: '/assets/images/body-oduor/body-oduor-1.jpg',
    images: [
      '/assets/images/body-oduor/body-oduor-1.jpg',
      '/assets/images/body-oduor/body-oduor-2.jpg',
      '/assets/images/body-oduor/body-oduor-3.jpg'
    ],
    tags: ['hygiene', 'puberty', 'self-care', 'confidence'],
    featured: false,
    views: 1800,
    comments: 32,
    readTime: 4
  },
  {
    id: 3,
    slug: 'hair-maintenance-teens',
    title: 'HAIR MAINTENANCE FOR TEENS',
    category: ARTICLE_CATEGORIES.SELF_CARE,
    date: 'Jun 25, 2025',
    author: 'Beauty Team',
    excerpt: 'Comprehensive hair care guide for teenagers dealing with changing hair needs during puberty.',
    content: `
      During puberty, your hair goes through significant changes. Understanding how to care for your hair properly 
      will help you maintain healthy, great-looking hair throughout your teenage years.

      **Common Hair Changes During Puberty**
      - Increased oil production on scalp
      - Hair texture changes
      - Possible dandruff development
      - Growth rate changes

      **Essential Hair Care Routine**
      1. **Washing Frequency**: 2-3 times per week for most hair types
      2. **Right Products**: Choose shampoo based on your hair type
      3. **Conditioning**: Use conditioner on mid-lengths and ends
      4. **Gentle Handling**: Avoid harsh brushing when wet

      **Hair Styling Tips**
      - Limit heat styling tools
      - Use heat protectant when styling
      - Try different styles to find what works
      - Don't over-wash (can increase oil production)

      **Healthy Hair Habits**
      - Eat protein-rich foods
      - Stay hydrated
      - Get regular trims
      - Protect hair from sun damage
      - Use silk or satin pillowcases

      Your hair is your crown - treat it with care and it will look amazing!
    `,
    image: '/assets/images/hair maintainence/Hair-maintainence-primary.jpg',
    images: [
      '/assets/images/hair maintainence/Hair-maintainence-primary.jpg',
      '/assets/images/hair maintainence/hair-maintainence.jpg',
      '/assets/images/hair maintainence/Haie-maintainence-2.jpg'
    ],
    tags: ['hair-care', 'grooming', 'self-care', 'beauty'],
    featured: false,
    views: 1600,
    comments: 28,
    readTime: 4
  },
  {
    id: 4,
    slug: 'boost-your-self-esteem',
    title: 'BOOST YOUR SELF-ESTEEM',
    category: ARTICLE_CATEGORIES.SELF_CARE,
    date: 'Jun 23, 2025',
    author: 'Mental Health Team',
    excerpt: 'Practical strategies for building unshakeable confidence during your teenage years.',
    content: `
      Self-esteem is how you feel about yourself. During teenage years, it's normal for self-esteem to fluctuate, 
      but you can learn strategies to build lasting confidence.

      **Understanding Self-Esteem**
      Self-esteem affects:
      - How you treat yourself
      - The risks you're willing to take
      - Your relationships with others
      - Your academic and personal goals

      **Building Blocks of Healthy Self-Esteem**
      1. **Self-Awareness**: Know your strengths and areas for growth
      2. **Self-Acceptance**: Embrace your uniqueness
      3. **Self-Improvement**: Work on becoming your best self
      4. **Self-Compassion**: Treat yourself with kindness

      **Daily Practices for Better Self-Esteem**
      - Keep a gratitude journal
      - Celebrate small wins
      - Challenge negative self-talk
      - Set achievable goals
      - Surround yourself with positive people
      - Practice new skills
      - Help others (volunteering boosts mood)

      **When to Seek Help**
      If you experience persistent:
      - Negative thoughts about yourself
      - Anxiety or depression
      - Withdrawal from activities
      - Difficulty sleeping or eating

      Remember: You are worthy of love and respect, especially from yourself.
    `,
    image: '/assets/images/self-esteem/self-esteem1.jpg',
    images: [
      '/assets/images/self-esteem/self-esteem1.jpg',
      '/assets/images/self-esteem/self-esteem2.jpg',
      '/assets/images/self-esteem/self-esteem3.jpg'
    ],
    tags: ['self-esteem', 'confidence', 'mental-health', 'personal-development'],
    featured: false,
    views: 2100,
    comments: 67,
    readTime: 6
  },

  // ========================
  // LEADERSHIP CATEGORY
  // ========================
  {
    id: 5,
    slug: 'boylan-sisters-cover-story',
    title: 'THE BOYLAN SISTERS: Constitutional Champions',
    category: ARTICLE_CATEGORIES.LEADERSHIP,
    date: 'Jun 25, 2025',
    author: 'Teendom Team',
    excerpt: 'Meet the inspiring Boylan sisters who are revolutionizing youth advocacy and constitutional education across Kenya.',
    content: `
      In many African societies, the "Kaya" (sacred forest) represented peace, wisdom, and community decision-making. 
      When conflicts arose, elders would gather to find solutions that restored harmony rather than simply punishing wrongdoers.

      **Traditional Peacemaking Principles**
      - **Ubuntu**: "I am because we are" - interconnectedness of humanity
      - **Restorative Justice**: Healing relationships rather than punishment
      - **Community Involvement**: Everyone has a role in maintaining peace
      - **Consensus Building**: Decisions made through discussion and agreement
      - **Ritual and Ceremony**: Sacred practices to mark reconciliation

      **Modern Applications**
      These ancient wisdom practices inform today's:
      - **Truth and Reconciliation Commissions**: Healing after conflict
      - **Mediation Programs**: Peaceful resolution of disputes
      - **Community Justice**: Involving communities in addressing crime
      - **International Diplomacy**: Negotiating between nations
      - **School Conflict Resolution**: Peer mediation programs

      **Understanding Modern Conflicts**
      Today's conflicts often stem from:
      - **Resource Competition**: Land, water, economic opportunities
      - **Identity Differences**: Ethnic, religious, or cultural divisions
      - **Political Power**: Struggles for control and representation
      - **Historical Grievances**: Unresolved past injustices
      - **Social Inequality**: Unfair distribution of opportunities

      **Peacebuilding Skills for Teens**
      1. **Active Listening**: Truly hearing others' perspectives
      2. **Empathy**: Understanding different viewpoints
      3. **Communication**: Expressing needs without attacking others
      4. **Mediation**: Helping others resolve conflicts
      5. **Leadership**: Promoting peace in your community

      **Creating Peace in Your Daily Life**
      - **School**: Prevent and resolve conflicts with classmates
      - **Family**: Navigate disagreements with siblings and parents
      - **Community**: Bridge divides between different groups
      - **Online**: Promote respectful dialogue on social media
      - **Society**: Participate in peaceful advocacy for change

      **When Conflicts Escalate**
      Sometimes peaceful resolution isn't possible, and communities must protect themselves. 
      Understanding when and how to use force responsibly is also part of building peace:
      - **Self-Defense**: Protecting yourself and others from harm
      - **Legal Action**: Using courts and law enforcement appropriately
      - **Collective Action**: Organized peaceful resistance to injustice
      - **International Intervention**: When local solutions aren't sufficient

      **Young Peacebuilders in Action**
      Learn from young Kenyans who are:
      - Mediating conflicts in their schools and communities
      - Creating inter-ethnic dialogue programs
      - Using art and music to promote peace
      - Advocating for peaceful political participation
      - Building bridges across divided communities

      **Your Role as a Peacemaker**
      - **Start Small**: Practice peace in your daily interactions
      - **Learn Continuously**: Study successful peace processes
      - **Build Alliances**: Work with others who share your values
      - **Stay Hopeful**: Believe that change is possible
      - **Take Action**: Don't wait for others to create the change you want to see

      Peace is not the absence of conflict, but the presence of justice and the skills to resolve differences constructively.
    `,
    image: '/assets/images/Kaya to war/kata to war1.jpg',
    images: [
      '/assets/images/Kaya to war/kata to war1.jpg',
      '/assets/images/Kaya to war/kaya to war2.jpg'
    ],
    tags: ['peace', 'conflict-resolution', 'traditional-wisdom', 'community', 'justice'],
    featured: false,
    views: 1400,
    comments: 38,
    readTime: 7
  }
];

// Featured articles for homepage
export const getFeaturedArticles = () => {
  return ARTICLES.filter(article => article.featured);
};

// Get articles by category
export const getArticlesByCategory = (categoryName) => {
  if (categoryName === 'All') return ARTICLES;
  return ARTICLES.filter(article => article.category.name === categoryName);
};

// Get article by slug
export const getArticleBySlug = (slug) => {
  return ARTICLES.find(article => article.slug === slug);
};

// Get related articles
export const getRelatedArticles = (currentArticle, limit = 3) => {
  return ARTICLES
    .filter(article => 
      article.id !== currentArticle.id && 
      article.category.name === currentArticle.category.name
    )
    .slice(0, limit);
};

// Get popular articles
export const getPopularArticles = (limit = 5) => {
  return ARTICLES
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
};

// Get recent articles
export const getRecentArticles = (limit = 10) => {
  return ARTICLES
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
};

// Search articles
export const searchArticles = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return ARTICLES.filter(article =>
    article.title.toLowerCase().includes(lowercaseQuery) ||
    article.excerpt.toLowerCase().includes(lowercaseQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    article.author.toLowerCase().includes(lowercaseQuery)
  );
}; a world where young voices often go unheard, the Boylan sisters stand as beacons of hope and change. 
      These remarkable young women have dedicated their lives to ensuring that every Kenyan teenager understands 
      their constitutional rights and responsibilities.

      **Meet the Sisters**
      The Boylan family has raised daughters who embody the spirit of servant leadership. Each sister brings 
      unique strengths to their shared mission of youth empowerment and constitutional education.

      **Their Mission**
      - **Constitutional Education**: Making complex legal concepts accessible to teenagers
      - **Youth Advocacy**: Representing young people's interests in policy discussions
      - **Community Engagement**: Organizing workshops and seminars across Kenya
      - **Mentorship**: Guiding other young leaders to find their voice

      **Impact Across Kenya**
      The sisters have:
      - Trained over 500 teen facilitators
      - Reached 10,000+ students directly
      - Influenced policy discussions on youth participation
      - Created sustainable programs in rural communities

      **Lessons from Their Journey**
      1. **Start Where You Are**: You don't need to wait to make a difference
      2. **Education is Power**: Knowledge transforms individuals and communities
      3. **Collaboration Wins**: Working together amplifies impact
      4. **Persistence Pays**: Consistent effort creates lasting change

      **Their Advice to Young Leaders**
      "Don't wait for permission to lead. The constitution gives you rights - learn them, 
      use them, and help others understand them too. Your voice matters, and Kenya needs 
      young people who are informed and engaged."

      The Boylan sisters prove that age is just a number when it comes to creating meaningful change.
    `,
    image: '/assets/images/babylon/babylon-sisters-cover.jpg',
    images: [
      '/assets/images/babylon/babylon-sisters-cover.jpg',
      '/assets/images/babylon/babylon-sisters-2.jpg',
      '/assets/images/babylon/babylon-sisters-3.jpg',
      '/assets/images/babylon/babylon-sisters-4.jpg'
    ],
    tags: ['leadership', 'constitutional-education', 'youth-advocacy', 'sisterhood', 'changemakers'],
    featured: true,
    views: 3200,
    comments: 78,
    readTime: 7
  },

  // ========================
  // ENTREPRENEURSHIP CATEGORY
  // ========================
  {
    id: 6,
    slug: 'teen-ceo-building-empire',
    title: 'TEEN CEO: Building Your Empire Young',
    category: ARTICLE_CATEGORIES.ENTREPRENEURSHIP,
    date: 'Jun 20, 2025',
    author: 'Business Team',
    excerpt: 'Inspiring stories of young entrepreneurs and practical steps to start your own business as a teenager.',
    content: `
      Age is just a number when it comes to entrepreneurship. Some of the world's most successful companies 
      were started by teenagers who saw problems and created solutions.

      **Young Entrepreneur Success Stories**
      - **Tech Innovators**: Creating apps and solving digital problems
      - **Social Entrepreneurs**: Addressing community challenges
      - **Creative Businesses**: Turning talents into profitable ventures
      - **Service Providers**: Meeting local market needs

      **Steps to Start Your Teen Business**
      1. **Identify a Problem**: What frustrates you or your peers?
      2. **Research the Market**: Who else is solving this problem?
      3. **Start Small**: Begin with minimal investment
      4. **Get Feedback**: Test your idea with potential customers
      5. **Learn Continuously**: Embrace failures as learning opportunities

      **Essential Business Skills for Teens**
      - **Financial Literacy**: Understanding money, budgets, and profits
      - **Communication**: Selling your ideas effectively
      - **Problem-Solving**: Finding creative solutions
      - **Time Management**: Balancing school and business
      - **Digital Marketing**: Reaching customers online

      **Resources for Teen Entrepreneurs**
      - Mentorship programs
      - Online courses
      - Local business incubators
      - Government youth funds
      - Peer networks and clubs

      **Challenges to Expect**
      - Balancing school and business
      - Limited financial resources
      - Gaining credibility despite age
      - Managing stress and pressure

      **Your Action Plan**
      1. Choose one skill to develop this month
      2. Identify three business ideas you're passionate about
      3. Interview one successful entrepreneur
      4. Start a small project to test your idea
      5. Connect with other young entrepreneurs

      Remember: Every expert was once a beginner. Your age is an advantage - you have energy, 
      creativity, and a fresh perspective that the world needs.
    `,
    image: '/assets/images/teen ceo/Teen ceo primary.JPG',
    images: [
      '/assets/images/teen ceo/Teen ceo primary.JPG',
      '/assets/images/teen ceo/Teen ceo1.PNG',
      '/assets/images/teen ceo/Teen ceo2.jpg',
      '/assets/images/teen ceo/teen ceo3.JPG'
    ],
    tags: ['entrepreneurship', 'business', 'startup', 'teen-business', 'innovation'],
    featured: false,
    views: 2800,
    comments: 92,
    readTime: 8
  },

  // ========================
  // MONEY CATEGORY
  // ========================
  {
    id: 7,
    slug: 'stay-wise-about-your-cents',
    title: 'HOW TO STAY WISE ABOUT YOUR CENTS',
    category: ARTICLE_CATEGORIES.MONEY,
    date: 'Jun 18, 2025',
    author: 'Linet Wanjira',
    excerpt: 'Teen-friendly financial tips for saving, budgeting, and making smart money decisions that will set you up for life.',
    content: `
      Money management is a life skill that's best learned early. As a teenager, developing good financial 
      habits now will benefit you for the rest of your life.

      **Understanding Money Basics**
      - **Income**: Money coming in (allowance, gifts, part-time work)
      - **Expenses**: Money going out (snacks, transport, entertainment)
      - **Saving**: Money set aside for future goals
      - **Investing**: Money put to work to grow over time

      **The 50/30/20 Teen Rule**
      For every 100 shillings you receive:
      - **50 shillings**: Needs (transport, school supplies, necessities)
      - **30 shillings**: Wants (entertainment, snacks, fun activities)
      - **20 shillings**: Savings (future goals, emergencies)

      **Smart Saving Strategies**
      1. **Start Small**: Even 10 shillings per week adds up
      2. **Set Goals**: Save for specific things you want
      3. **Use Jars/Accounts**: Separate money for different purposes
      4. **Track Progress**: Watch your money grow
      5. **Celebrate Milestones**: Reward yourself for reaching goals

      **Avoiding Money Mistakes**
      - Don't spend money you don't have
      - Avoid peer pressure to buy expensive items
      - Think twice before making impulse purchases
      - Don't lend money you can't afford to lose
      - Always compare prices before buying

      **Ways to Earn Money as a Teen**
      - Tutoring younger students
      - Helping with household chores
      - Simple online tasks
      - Selling items you've made
      - Part-time work (with permission)

      **Building Credit Early**
      - Understand how credit works
      - Learn about loans and interest
      - Start building a positive financial reputation
      - Avoid debt unless absolutely necessary

      **Money Mindset Tips**
      - Money is a tool, not a measure of worth
      - Focus on value, not just price
      - Delayed gratification leads to bigger rewards
      - Invest in experiences and education
      - Be generous when you can afford it

      Your relationship with money starts now. Make it a healthy one!
    `,
    image: '/assets/images/finances/primary.jpg',
    images: [
      '/assets/images/finances/primary.jpg',
      '/assets/images/finances/finances1.jpg',
      '/assets/images/finances/finances3.jpg'
    ],
    tags: ['money-management', 'saving', 'budgeting', 'financial-literacy', 'teen-finance'],
    featured: false,
    views: 1900,
    comments: 56,
    readTime: 6
  },
  {
    id: 8,
    slug: 'savings-smart-teens',
    title: 'SAVINGS FOR SMART TEENS',
    category: ARTICLE_CATEGORIES.MONEY,
    date: 'Jun 16, 2025',
    author: 'Makenya Financial Expert',
    excerpt: 'Advanced saving strategies for teenagers who want to build wealth and achieve financial freedom.',
    content: `
      Saving money as a teenager isn't just about putting coins in a piggy bank. It's about developing 
      a mindset and strategies that will serve you throughout your life.

      **Why Teens Should Start Saving Now**
      - **Compound Interest**: Money grows faster when you start early
      - **Financial Independence**: Less dependence on others
      - **Emergency Fund**: Peace of mind for unexpected expenses
      - **Future Goals**: College, business, or dream purchases
      - **Good Habits**: Building discipline that lasts a lifetime

      **Advanced Saving Techniques**
      1. **The 365-Day Challenge**: Save increasing amounts daily
      2. **Round-Up Savings**: Round purchases up and save the difference
      3. **Goal-Based Envelopes**: Separate savings for different goals
      4. **Percentage Savings**: Save a percentage of all money received
      5. **Seasonal Savings**: Save more during certain times of year

      **Creating Multiple Savings Goals**
      - **Short-term** (1-6 months): New phone, special event
      - **Medium-term** (6 months-2 years): Laptop, travel
      - **Long-term** (2+ years): College fund, business startup

      **Making Your Money Work**
      - Research youth savings accounts with good interest rates
      - Understand the difference between saving and investing
      - Learn about government savings programs for youth
      - Consider starting a small business to generate income

      **Staying Motivated**
      - Visualize your goals with pictures
      - Track progress weekly
      - Share goals with supportive friends/family
      - Celebrate reaching milestones
      - Adjust goals as needed

      **Common Saving Obstacles and Solutions**
      - **Peer Pressure**: Remember your goals are more important
      - **Impulse Spending**: Wait 24 hours before buying
      - **Small Amounts**: Every shilling counts
      - **Lack of Income**: Get creative about earning opportunities

      Your future self will thank you for every shilling you save today!
    `,
    image: '/assets/images/savings/savings primary.jpg',
    images: [
      '/assets/images/savings/savings primary.jpg',
      '/assets/images/savings/savings.jpg',
      '/assets/images/savings/savings2.jpg'
    ],
    tags: ['savings', 'financial-planning', 'wealth-building', 'teen-money', 'investment'],
    featured: false,
    views: 1700,
    comments: 43,
    readTime: 5
  },

  // ========================
  // RELATIONSHIPS CATEGORY
  // ========================
  {
    id: 9,
    slug: 'ten-reasons-teenage-sexuality',
    title: '10 REASONS WHY TEENAGERS ARE HAVING SEX, OR SHOULDN\'T',
    category: ARTICLE_CATEGORIES.RELATIONSHIPS,
    date: 'Jun 14, 2025',
    author: 'Health & Relationships Team',
    excerpt: 'A frank, honest discussion about teenage sexuality, consent, and making informed decisions about relationships.',
    content: `
      Sexuality is a natural part of human development, but teenage years come with unique challenges and considerations. 
      Let's have an honest conversation about the factors that influence teenage sexual decisions.

      **Why Some Teenagers Choose to Have Sex**
      1. **Curiosity**: Natural interest in physical intimacy
      2. **Peer Pressure**: Feeling pressure to "fit in" or seem mature
      3. **Emotional Connection**: Desire to express love or feel closer to someone
      4. **Media Influence**: Unrealistic portrayals in movies, music, and social media
      5. **Rebellion**: Acting out against parental or societal expectations

      **Why Waiting Might Be the Better Choice**
      1. **Emotional Readiness**: Sexuality involves complex emotions that develop over time
      2. **Physical Health**: Risk of STIs and unplanned pregnancy
      3. **Legal Considerations**: Age of consent laws exist for protection
      4. **Educational Priorities**: Focus on personal growth and academic goals
      5. **Relationship Skills**: Learning to build healthy relationships first

      **Making Informed Decisions**
      - **Education**: Understand your body, reproduction, and protection
      - **Communication**: Talk openly with trusted adults and partners
      - **Consent**: Every person has the right to say no at any time
      - **Protection**: If sexually active, always use protection
      - **Regular Testing**: Know your health status

      **Healthy Relationship Foundations**
      - **Respect**: For yourself and your partner
      - **Trust**: Built through consistent, honest behavior
      - **Communication**: Talking about feelings, boundaries, and expectations
      - **Equality**: Both people have equal say in the relationship
      - **Independence**: Maintaining your own identity and friendships

      **Red Flags to Watch For**
      - Pressure to do things you're not comfortable with
      - Partners who don't respect your boundaries
      - Secrecy or isolation from friends and family
      - Controlling behavior
      - Any form of violence or threats

      **Getting Support**
      - Talk to trusted adults (parents, counselors, teachers)
      - Visit healthcare providers for accurate information
      - Contact youth helplines for confidential support
      - Join support groups for teens

      Remember: Your worth is not determined by your sexual choices. Whether you choose to wait or not, 
      make decisions based on your values, readiness, and well-being.
    `,
    image: '/assets/images/relationships/relatinships.jpg',
    tags: ['sexuality', 'relationships', 'consent', 'health', 'decision-making'],
    featured: false,
    views: 4100,
    comments: 123,
    readTime: 8
  },
  {
    id: 10,
    slug: 'ride-or-die-healthy-relationships',
    title: 'RIDE OR DIE: Building Healthy Relationships',
    category: ARTICLE_CATEGORIES.RELATIONSHIPS,
    date: 'Jun 12, 2025',
    author: 'Faith Bwari',
    excerpt: 'Understanding what makes a relationship truly supportive versus toxic, and how to build connections that last.',
    content: `
      The term "ride or die" has become popular among young people, but what does it really mean to have 
      someone's back through thick and thin? Let's explore what healthy loyalty looks like.

      **True "Ride or Die" Characteristics**
      - **Unconditional Support**: Being there during tough times
      - **Honest Communication**: Telling the truth even when it's hard
      - **Mutual Respect**: Valuing each other's opinions and boundaries
      - **Growth Together**: Encouraging each other to become better people
      - **Healthy Boundaries**: Supporting without enabling harmful behavior

      **Toxic vs. Healthy Loyalty**
      
      **Toxic "Ride or Die":**
      - Covering up harmful behavior
      - Never challenging poor decisions
      - Isolation from other relationships
      - Enabling destructive patterns
      - Fear-based loyalty

      **Healthy "Ride or Die":**
      - Supporting positive growth
      - Honest feedback when needed
      - Encouraging other healthy relationships
      - Setting boundaries when necessary
      - Love-based loyalty

      **Building Strong Friendships**
      1. **Be Authentic**: Show up as your real self
      2. **Listen Actively**: Really hear what others are saying
      3. **Keep Confidences**: Be trustworthy with personal information
      4. **Show Up**: Be present during important moments
      5. **Forgive**: Everyone makes mistakes

      **Romantic Relationships for Teens**
      - **Take It Slow**: Build friendship before romance
      - **Maintain Independence**: Keep your own interests and friends
      - **Communicate Clearly**: Express your feelings and needs
      - **Respect Boundaries**: Both yours and your partner's
      - **Focus on Growth**: Help each other become better people

      **Warning Signs of Unhealthy Relationships**
      - Constant drama or conflict
      - Feeling like you have to change who you are
      - Isolation from family and other friends
      - Controlling or jealous behavior
      - Pressure to do things that make you uncomfortable

      **How to Be a Good Friend**
      - Celebrate others' successes genuinely
      - Offer support during difficult times
      - Be reliable and keep your promises
      - Practice empathy and understanding
      - Stand up for friends when they're not present

      True "ride or die" relationships are built on love, respect, and mutual growth - not blind loyalty.
    `,
    image: '/assets/images/Ride or die/Ride or die.jpg',
    tags: ['friendship', 'loyalty', 'relationships', 'boundaries', 'support'],
    featured: false,
    views: 2200,
    comments: 87,
    readTime: 6
  },

  // ========================
  // LIFESTYLE CATEGORY
  // ========================
  {
    id: 11,
    slug: 'where-is-god',
    title: 'WHERE IS GOD?',
    category: ARTICLE_CATEGORIES.LIFESTYLE,
    date: 'Jun 10, 2025',
    author: 'Faith & Spirituality Team',
    excerpt: 'Exploring faith, spirituality, and finding meaning as a teenager in today\'s complex world.',
    content: `
      Many teenagers grapple with questions about God, faith, and spirituality. These questions are normal, 
      healthy, and part of developing your own belief system.

      **Common Questions Teens Ask**
      - "If God exists, why is there suffering?"
      - "How do I know which religion is right?"
      - "Can I be spiritual without being religious?"
      - "Why do bad things happen to good people?"
      - "How do I find my purpose?"

      **Different Paths to Spirituality**
      - **Traditional Religion**: Following established faiths and practices
      - **Personal Spirituality**: Creating your own connection to the divine
      - **Secular Meaning**: Finding purpose through philosophy and ethics
      - **Nature-Based**: Connecting with spirituality through the natural world
      - **Service-Oriented**: Finding meaning through helping others

      **Benefits of Spiritual Practice**
      - **Sense of Purpose**: Understanding your place in the world
      - **Community**: Connecting with like-minded people
      - **Comfort**: Support during difficult times
      - **Values**: Framework for making ethical decisions
      - **Peace**: Inner calm and perspective

      **Exploring Your Beliefs**
      1. **Ask Questions**: It's okay to doubt and wonder
      2. **Study Different Perspectives**: Learn about various beliefs
      3. **Talk to Others**: Discuss with family, friends, and spiritual leaders
      4. **Meditate/Pray**: Spend quiet time in reflection
      5. **Practice**: Try different spiritual practices

      **Faith and Science**
      Many people find that faith and scientific understanding can coexist. Some see science as 
      a way to understand how God's creation works, while others separate their spiritual and 
      scientific thinking entirely.

      **Building Your Own Relationship with the Divine**
      - **Be Patient**: Spiritual growth is a lifelong journey
      - **Stay Open**: Your beliefs may evolve as you grow
      - **Practice Gratitude**: Appreciate the good in your life
      - **Serve Others**: Many find God through helping people
      - **Stay Connected**: Regular spiritual practice maintains your connection

      **When You're Struggling**
      - It's normal to have doubts and questions
      - Seek guidance from trusted spiritual mentors
      - Remember that faith often grows through challenges
      - Find community with others on similar journeys
      - Be gentle with yourself during times of questioning

      Your spiritual journey is unique to you. Trust the process and stay open to growth.
    `,
    image: '/assets/images/God/God.jpg',
    tags: ['spirituality', 'faith', 'religion', 'purpose', 'meaning'],
    featured: false,
    views: 1800,
    comments: 95,
    readTime: 7
  },

  // ========================
  // MENTAL HEALTH CATEGORY
  // ========================
  {
    id: 12,
    slug: 'differently-gifted-neurodiversity',
    title: 'DIFFERENTLY GIFTED: Embracing Neurodiversity',
    category: ARTICLE_CATEGORIES.MENTAL_HEALTH,
    date: 'Jun 8, 2025',
    author: 'Mental Health Team',
    excerpt: 'Celebrating different learning styles and supporting neurodivergent teens in their unique journey.',
    content: `
      Every brain is wired differently, and that's not just okay - it's amazing! Neurodiversity celebrates 
      the natural variation in how human brains work and learn.

      **Understanding Neurodiversity**
      Neurodiversity includes conditions like:
      - **ADHD**: Attention differences and hyperactivity
      - **Autism**: Social communication differences and focused interests
      - **Dyslexia**: Reading and language processing differences
      - **Dyspraxia**: Coordination and movement differences
      - **Anxiety Disorders**: Heightened worry and fear responses

      **Strengths of Neurodivergent Thinking**
      - **Creative Problem-Solving**: Thinking outside the box
      - **Attention to Detail**: Noticing things others miss
      - **Passionate Interests**: Deep knowledge in specific areas
      - **Authentic Communication**: Honest and direct interaction
      - **Innovative Thinking**: Approaching challenges differently

      **Challenges Neurodivergent Teens Face**
      - **Educational Systems**: Not designed for different learning styles
      - **Social Misunderstandings**: Others not understanding their behavior
      - **Sensory Issues**: Overwhelming environments
      - **Executive Function**: Difficulty with organization and time management
      - **Self-Advocacy**: Learning to ask for what they need

      **Strategies for Success**
      1. **Know Your Strengths**: Identify what you do well
      2. **Understand Your Challenges**: Learn about your specific needs
      3. **Develop Coping Strategies**: Find what works for you
      4. **Build Support Networks**: Connect with understanding people
      5. **Self-Advocate**: Communicate your needs clearly

      **Creating Neurodivergent-Friendly Environments**
      - **Sensory Considerations**: Quiet spaces, appropriate lighting
      - **Clear Communication**: Direct, specific instructions
      - **Flexible Approaches**: Multiple ways to demonstrate learning
      - **Patience and Understanding**: Time to process and respond
      - **Celebrating Differences**: Recognizing unique contributions

      **For Neurotypical Teens**
      How to be a good ally:
      - **Listen and Learn**: Understand different perspectives
      - **Don't Make Assumptions**: Ask questions respectfully
      - **Stand Against Bullying**: Protect vulnerable classmates
      - **Celebrate Differences**: Appreciate unique talents
      - **Include Everyone**: Make sure no one is left out

      **Resources and Support**
      - School counseling services
      - Support groups for neurodivergent teens
      - Online communities and forums
      - Educational advocacy organizations
      - Mental health professionals specializing in neurodiversity

      **Famous Neurodivergent Success Stories**
      Many successful people are neurodivergent, including entrepreneurs, artists, scientists, and leaders 
      who've changed the world with their unique perspectives.

      Remember: Your brain works differently, not wrongly. Your unique perspective is valuable and needed in this world.
    `,
    image: '/assets/images/gifted-differently/Differently-gifted.jpg',
    tags: ['neurodiversity', 'mental-health', 'learning-differences', 'inclusion', 'support'],
    featured: false,
    views: 1600,
    comments: 72,
    readTime: 8
  },

  // ========================
  // CAREER CATEGORY
  // ========================
  {
    id: 13,
    slug: 'in-their-footsteps-career-paths',
    title: 'IN THEIR FOOTSTEPS: Career Inspiration',
    category: ARTICLE_CATEGORIES.CAREER,
    date: 'Jun 6, 2025',
    author: 'Career Team',
    excerpt: 'Inspiring career stories and practical guidance for teenagers exploring their future paths.',
    content: `
      Choosing a career path can feel overwhelming, but remember that careers are journeys, not destinations. 
      Let's explore how successful people found their paths and how you can discover yours.

      **Career Discovery Process**
      1. **Self-Assessment**: Understand your interests, values, and strengths
      2. **Exploration**: Research different career options
      3. **Experience**: Try internships, volunteer work, or job shadowing
      4. **Education**: Identify required skills and education
      5. **Planning**: Create a roadmap for your goals

      **Popular Career Paths for Today's Teens**
      
      **Technology Careers:**
      - Software Development
      - Cybersecurity
      - Data Science
      - Digital Marketing
      - UX/UI Design

      **Creative Careers:**
      - Content Creation
      - Graphic Design
      - Photography/Videography
      - Writing and Journalism
      - Entertainment Industry

      **Healthcare Careers:**
      - Medicine and Nursing
      - Mental Health Counseling
      - Physical Therapy
      - Medical Technology
      - Public Health

      **Business and Finance:**
      - Entrepreneurship
      - Finance and Banking
      - Marketing and Sales
      - Human Resources
      - Project Management

      **Success Stories from Kenya**
      Learn from young Kenyan professionals who've built amazing careers:
      - Tech entrepreneurs creating solutions for African problems
      - Creative professionals gaining international recognition
      - Young doctors and nurses making healthcare more accessible
      - Innovative farmers using technology to improve agriculture

      **Building Your Career Foundation**
      - **Develop Key Skills**: Communication, problem-solving, teamwork
      - **Build Your Network**: Connect with professionals in your interests
      - **Gain Experience**: Volunteer, intern, or take on projects
      - **Stay Curious**: Keep learning and growing
      - **Be Adaptable**: Careers evolve with changing times

      **Overcoming Career Obstacles**
      - **Limited Resources**: Look for scholarships and free training programs
      - **Family Expectations**: Balance family wishes with personal interests
      - **Lack of Connections**: Build networks through school and community activities
      - **Uncertain Future**: Focus on developing transferable skills

      **The Gig Economy and Freelancing**
      Many young people are creating their own career paths through:
      - Freelance work in various fields
      - Multiple income streams
      - Online businesses and services
      - Skills-based temporary work

      **Preparing for Tomorrow's Jobs**
      - Develop digital literacy skills
      - Learn to adapt to new technologies
      - Build emotional intelligence
      - Cultivate creativity and innovation
      - Practice lifelong learning

      Your career journey is unique to you. Stay open to opportunities and remember that it's okay to change direction as you grow.
    `,
    image: '/assets/images/career/career primary.jpg',
    images: [
      '/assets/images/career/career primary.jpg',
      '/assets/images/career/career1.jpg',
      '/assets/images/career/career2.jpg'
    ],
    tags: ['career', 'future', 'planning', 'inspiration', 'professional-development'],
    featured: false,
    views: 2400,
    comments: 68,
    readTime: 9
  },

  // ========================
  // LAW AND SOCIETY CATEGORY
  // ========================
  {
    id: 14,
    slug: 'bully-proof-your-life',
    title: 'BULLY PROOF YOUR LIFE',
    category: ARTICLE_CATEGORIES.LAW_SOCIETY,
    date: 'Jun 4, 2025',
    author: 'Legal & Safety Team',
    excerpt: 'Comprehensive guide to understanding, preventing, and dealing with bullying from a legal and practical perspective.',
    content: `
      Bullying is a serious issue that affects millions of teenagers worldwide. Understanding your rights 
      and knowing how to protect yourself is crucial for your safety and well-being.

      **Types of Bullying**
      - **Physical**: Hitting, pushing, damaging property
      - **Verbal**: Name-calling, threats, insults
      - **Social/Relational**: Exclusion, spreading rumors, public humiliation
      - **Cyberbullying**: Online harassment through social media, texts, emails

      **Legal Framework in Kenya**
      - The Constitution guarantees dignity and freedom from violence
      - Children's Act protects minors from abuse and harm
      - Schools have legal obligations to provide safe environments
      - Cybercrime laws address online harassment

      **Your Rights When Facing Bullying**
      - **Right to Safety**: You deserve to feel safe at school and online
      - **Right to Education**: Bullying should not interfere with learning
      - **Right to Dignity**: No one has the right to humiliate or degrade you
      - **Right to Report**: You can and should report bullying incidents

      **Immediate Response to Bullying**
      1. **Stay Calm**: Don't react with violence or anger
      2. **Document Everything**: Keep records of incidents
      3. **Tell a Trusted Adult**: Parent, teacher, counselor
      4. **Seek Support**: Don't face bullying alone
      5. **Know When to Get Help**: Some situations require immediate intervention

      **Prevention Strategies**
      - **Build Confidence**: Bullies often target those who seem vulnerable
      - **Develop Social Skills**: Strong friendships provide protection
      - **Learn Conflict Resolution**: Peaceful problem-solving skills
      - **Digital Safety**: Protect your online presence
      - **Awareness**: Recognize warning signs and risky situations

      **Bystander Intervention**
      If you witness bullying:
      - **Don't Ignore It**: Silence enables bullying
      - **Support the Victim**: Offer friendship and assistance
      - **Report to Authorities**: Help ensure incidents are addressed
      - **Refuse to Participate**: Don't join in or encourage bullying
      - **Create Inclusive Environments**: Welcome everyone

      **Cyberbullying Protection**
      - **Privacy Settings**: Limit who can contact and see your posts
      - **Think Before Posting**: Content can be screenshot and shared
      - **Report and Block**: Use platform tools to stop harassment
      - **Save Evidence**: Screenshots can be important for reporting
      - **Get Support**: Online bullying affects real mental health

      **When to Involve Law Enforcement**
      Contact police when bullying involves:
      - Physical violence or threats of violence
      - Sexual harassment or assault
      - Destruction of property
      - Stalking or persistent harassment
      - Cybercrime activities

      **Recovery and Healing**
      - **Therapy/Counseling**: Professional help for emotional healing
      - **Support Groups**: Connect with others who understand
      - **Self-Care Practices**: Activities that restore mental health
      - **Rebuilding Confidence**: Focus on strengths and achievements
      - **Creating New Relationships**: Form healthy, supportive connections

      **Building a Bully-Free Community**
      - Promote respect and inclusion in all interactions
      - Challenge discriminatory attitudes and behaviors
      - Support anti-bullying initiatives in schools
      - Educate others about the impact of bullying
      - Be the change you want to see

      Remember: No one deserves to be bullied. Seeking help is a sign of strength, not weakness.
    `,
    image: '/assets/images/bully/bully-image-1.jpg',
    images: [
      '/assets/images/bully/bully-image-1.jpg',
      '/assets/images/bully/bully-image-2.jpg',
      '/assets/images/bully/bully-image-3.jpg'
    ],
    tags: ['bullying', 'safety', 'legal-rights', 'cyberbullying', 'prevention'],
    featured: false,
    views: 3100,
    comments: 145,
    readTime: 10
  },
  {
    id: 15,
    slug: 'from-kaya-to-war',
    title: 'FROM KAYA TO WAR: Understanding Conflict',
    category: ARTICLE_CATEGORIES.LAW_SOCIETY,
    date: 'Jun 2, 2025',
    author: 'History & Peace Studies Team',
    excerpt: 'Exploring how traditional conflict resolution methods can inform modern peacebuilding efforts.',
    content: `
      Throughout history, communities have faced conflicts and developed ways to resolve them. Understanding 
      these processes helps us build more peaceful societies today.

      **Traditional Conflict Resolution**
      In