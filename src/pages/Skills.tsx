import { motion } from 'framer-motion';

const skillsData = [
  {
    category: "Frontend",
    skills: [
      { 
        name: "HTML5", 
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEc9A_S6BPxCDRp5WjMFEfXrpCu1ya2OO-Lw&s", 
        proficiency: 90 
      },
      { 
        name: "CSS3", 
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfkMYb955fj7IRiw-8g6gmn5GoZzKni1Kv8g&s", 
        proficiency: 85 
      },
      { 
        name: "JavaScript", 
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFTytJXaZrs_aCzd8IcEjptHQAD9sGTBoQxA&s", 
        proficiency: 88 
      },
      { 
        name: "React", 
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz5_pFXLFlros8tRZoOHLVZVI30KJEU411IQ&s", 
        proficiency: 85 
      },
      { 
        name: "Tailwind CSS", 
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiEyK3Fikb7awfCerGVez2BuNDdXhLUPCQ6g&s", 
        proficiency: 80 
      },
      { 
        name: "Bootstrap", 
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBVOtPjeWtB39bOsOoOWso3HTiaEF2szC8jA&s", 
        proficiency: 82 
      },
    ]
  },
  {
    category: "Backend",
    skills: [
      { 
        name: "Node.js", 
        icon: "https://miro.medium.com/v2/resize:fit:866/1*1UBNwRFaslvqt_G3Njw3pg.jpeg", 
        proficiency: 80 
      },
      { 
        name: "MongoDB", 
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNcCK71bf4Yaf9qLrEk9BdAzIf6fRR6StmKA&s", 
        proficiency: 75 
      },
      { 
        name: "Supabase", 
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFDHildxzT5877ulG2DxdifC0CkJrlb4Bw0w&s", 
        proficiency: 78 
      },
      { 
        name: "Database Design", 
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsryKG6shKSBL0f469HoEn76O4ISqmz2wyjw&s",
        proficiency: 75 
      },
    ]
  }
];

export default function Skills() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900">My Skills</h1>
          <p className="mt-4 text-xl text-gray-600">A comprehensive overview of my technical expertise</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {skillsData.map((category, idx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                {category.category}
              </h2>
              <div className="space-y-6">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img src={skill.icon} alt={skill.name} className="w-6 h-6" />
                        <span className="text-gray-700 font-medium">{skill.name}</span>
                      </div>
                      <span className="text-gray-500">{skill.proficiency}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 bg-white rounded-lg shadow-lg p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Additional Skills & Tools
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["Git", "REST API", "TypeScript", "Responsive Design", "UI/UX", "Agile", "VS Code", "GitHub", "npm"].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 