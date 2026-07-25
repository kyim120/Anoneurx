import { useState } from 'react';
import PageTransition from '@/components/PageTransition';
import MemberOverlayer, { Member } from '@/components/MemberOverlayer';

const professors: Member[] = [
  {
    name: "Dr. Sarah Chen",
    role: "Head of Artificial Intelligence",
    bio: "Former Research Director at Google Brain. Specializes in advanced neural networks and quantum machine learning.",
    fullBio: "Dr. Sarah Chen brings over two decades of experience in Artificial Intelligence, having previously spearheaded groundbreaking projects at Google Brain. Her research bridges the gap between quantum computing and neural networks, pioneering new architectures that exponentially increase processing capabilities. She has published extensively in top-tier journals and continues to shape the future of machine learning.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400",
    expertise: ["Machine Learning", "Quantum AI", "Neural Networks"],
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      github: "https://github.com",
    }
  },
  {
    name: "Prof. Michael Roberts",
    role: "Lead, Robotics & Autonomous Systems",
    bio: "Pioneer in swarm robotics. Previously led the autonomous systems division at Boston Dynamics.",
    fullBio: "Professor Michael Roberts is a visionary in the field of autonomous systems. With a rich background from Boston Dynamics, he has transitioned into academia to foster the next generation of roboticists. His primary focus is on swarm behavior algorithms inspired by nature, leading to robust and flexible multi-agent robotic systems deployed in complex environments.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400",
    expertise: ["Swarm Robotics", "Computer Vision", "Control Systems"],
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    }
  },
  {
    name: "Dr. Elena Rodriguez",
    role: "Director of Space Technologies",
    bio: "Astrophysicist and aerospace engineer. Lead researcher on the next-gen propulsion systems initiative.",
    fullBio: "Dr. Elena Rodriguez combines her expertise in astrophysics and practical aerospace engineering to push the boundaries of how humanity travels in space. As the lead researcher on next-generation propulsion, her work seeks to develop highly efficient drives capable of deep-space exploration. Her passion for orbital mechanics is contagious among her students.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400",
    expertise: ["Aerospace Engineering", "Propulsion", "Orbital Mechanics"],
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
    }
  },
  {
    name: "Prof. David Kim",
    role: "Chair of Blockchain Architecture",
    bio: "Core contributor to major blockchain protocols. Focuses on scalable consensus mechanisms and zero-knowledge proofs.",
    fullBio: "Professor David Kim stands at the forefront of decentralized systems. Having contributed significantly to foundational blockchain protocols, he now dedicates his efforts to solving the trilemma of scalability, security, and decentralization. His work on zero-knowledge proofs has revolutionized privacy-preserving applications in Web3.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400",
    expertise: ["Cryptography", "Distributed Systems", "Web3"],
    socials: {
      github: "https://github.com",
      twitter: "https://x.com",
    }
  },
  {
    name: "Dr. James Wilson",
    role: "Professor of Cyber Security",
    bio: "Former NSA security analyst. Leading expert in post-quantum cryptography and network defense.",
    fullBio: "With a classified past as an elite security analyst at the NSA, Dr. James Wilson brings unparalleled real-world experience into the classroom. His current research addresses the looming threat of quantum computing on classical encryption, devising post-quantum cryptographic standards to secure future networks against unprecedented attacks.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400",
    expertise: ["Cyber Security", "Network Defense", "Cryptography"],
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    }
  },
  {
    name: "Dr. Emily Taylor",
    role: "Director of Bioengineering",
    bio: "Pioneer in synthetic biology. Leads research on neural interfaces and bio-computation algorithms.",
    fullBio: "Dr. Emily Taylor is reshaping the convergence of biology and technology. Her pioneering work in synthetic biology explores how biological systems can be programmed like software. Under her direction, the bioengineering lab is currently making strides in high-bandwidth neural interfaces, seamless bio-computational integrations, and advanced prosthetics.",
    image: "https://images.unsplash.com/photo-1594824476961-43e808c01905?auto=format&fit=crop&q=80&w=400&h=400",
    expertise: ["Bioengineering", "Neural Interfaces", "Synthetic Biology"],
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
    }
  }
];

export default function Professors() {
  const [selectedProfessor, setSelectedProfessor] = useState<Member | null>(null);

  return (
    <PageTransition>
      <div className="pt-32 pb-20 min-h-screen relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 mt-10">
              Our Distinguished <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Professors</span>
            </h1>
            <p className="text-xl text-gray-400 font-medium max-w-2xl">
              Learn from industry pioneers and visionary researchers leading the frontier of technology at Anoneurx University.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {professors.map((professor, index) => (
              <div 
                key={index}
                onClick={() => setSelectedProfessor(professor)}
                className="group relative rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 cursor-pointer border-t border-white/5 bg-black/40 backdrop-blur-md pt-6 pb-4 px-4 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-square relative overflow-hidden rounded-lg">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                    <img 
                      src={professor.image} 
                      alt={professor.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute bottom-3 left-3 right-3 z-20">
                      <h3 className="text-lg font-bold text-white mb-0.5">{professor.name}</h3>
                      <p className="text-xs text-primary font-medium">{professor.role}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-gray-400 text-xs mb-4 leading-relaxed line-clamp-3">
                      {professor.bio}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className="text-[10px] font-semibold text-white uppercase tracking-wider">Areas of Expertise</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {professor.expertise.map((skill, sIdx) => (
                      <span 
                        key={sIdx}
                        className="px-2 py-0.5 text-[10px] font-medium bg-white/5 text-gray-300 rounded border border-white/10 group-hover:border-primary/30 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Member Overlayer Modal Component */}
      <MemberOverlayer
        member={selectedProfessor}
        onClose={() => setSelectedProfessor(null)}
      />
    </PageTransition>
  );
}
