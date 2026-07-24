import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Download,
  Calendar,
  Users,
  ExternalLink,
  BookOpen,
  Eye,
  Star,
  Share2,
  Bookmark,
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { useParallaxBackground } from "@/hooks/useParallaxBackground";
import { useState, useEffect } from "react";
import detailedResearchData from "@/data/detailedResearchData.json";
import { toast } from "@/components/ui/sonner";

const ReadPaper = () => {
  useParallaxBackground();
  const { id } = useParams();
  const navigate = useNavigate();
  const [paper, setPaper] = useState(null);

  useEffect(() => {
    const paperId = parseInt(id);
    const foundPaper = detailedResearchData.papers.find((p) => p.id === paperId);
    if (foundPaper) {
      setPaper(foundPaper);
    } else {
      navigate("/research-papers");
    }
  }, [id, navigate]);

  const handleDownloadPDF = () => {
    if (!paper) return;

    // Simulate PDF download
    const link = document.createElement("a");
    link.href = "#"; // In real app, this would be the actual PDF URL
    link.download = `${paper.title.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;

    // Create a blob for simulation
    const pdfContent = `
Research Paper: ${paper.title}
Authors: ${paper.authors.join(', ')}
Abstract: ${paper.abstract}
Journal: ${paper.journal}
Date: ${paper.date}

Full Content:
Introduction: ${paper.fullContent.introduction}
Methodology: ${paper.fullContent.methodology}
Results: ${paper.fullContent.results}
Conclusion: ${paper.fullContent.conclusion}

References:
${paper.fullContent.references.map((ref, i) => `[${i + 1}] ${ref}`).join('\n')}
    `;

    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    link.href = url;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast(`Downloaded: ${paper.title}`);
  };

  const handleShare = () => {
    const shareData = {
      title: paper.title,
      text: paper.abstract,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast("Link copied to clipboard!");
      }).catch(() => {
        toast("Failed to copy link");
      });
    }
  };

  const handleViewInJournal = () => {
    navigate("/view-in-journal");
  };

  if (!paper) {
    return (
      <PageTransition>
        <div className="universal-page-bg">
          <div className="universal-content">
            <div className="pt-24 text-center text-white">
              <h1 className="text-2xl font-bold mb-4">Paper Not Found</h1>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="universal-page-bg">

        <div className="universal-content">

          {/* Header */}
          <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  {paper.category}
                </Badge>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  {paper.status}
                </Badge>
              </div>

              {/* Paper Header */}
              <Card className="glass backdrop-blur-md bg-white/5 border border-white/10 mb-8">
                <CardHeader className="p-8">
                  <CardTitle className="text-3xl md:text-4xl text-white mb-4 leading-tight">
                    {paper.title}
                  </CardTitle>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-400" />
                        <span className="font-medium">Authors:</span>
                      </div>
                      <div className="ml-7">
                        {paper.authors.map((author, i) => (
                          <div key={i} className="text-gray-200">
                            {author}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-green-400" />
                        <span className="font-medium">Published:</span>
                        <span className="text-gray-200">{paper.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-purple-400" />
                        <span className="font-medium">Journal:</span>
                        <span className="text-gray-200">{paper.journal}</span>
                      </div>
                      {paper.doi && (
                        <div className="flex items-center gap-2">
                          <ExternalLink className="w-5 h-5 text-orange-400" />
                          <span className="font-medium">DOI:</span>
                          <span className="text-gray-200">{paper.doi}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Download className="w-4 h-4 text-orange-400" />
                          <span className="text-sm">
                            {paper.downloads} downloads
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4 text-cyan-400" />
                          <span className="text-sm">{paper.views} views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm">{paper.rating}/5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {paper.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="border-gray-600 text-white"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
              </Card>
            </div>
          </section>

          {/* Paper Content */}
          <section className="px-4 sm:px-6 lg:px-8 pb-16">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-3 space-y-8">
                  {/* Abstract */}
                  <Card className="glass backdrop-blur-md bg-white/5 border border-white/10">
                    <CardHeader>
                      <CardTitle className="text-2xl text-white mb-4">
                        Abstract
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white leading-relaxed text-lg">
                        {paper.abstract}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Introduction */}
                  <Card className="glass backdrop-blur-md bg-white/5 border border-white/10">
                    <CardHeader>
                      <CardTitle className="text-2xl text-white mb-4">
                        Introduction
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white leading-relaxed">
                        {paper.fullContent.introduction}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Methodology */}
                  <Card className="glass backdrop-blur-md bg-white/5 border border-white/10">
                    <CardHeader>
                      <CardTitle className="text-2xl text-white mb-4">
                        Methodology
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white leading-relaxed">
                        {paper.fullContent.methodology}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Results */}
                  <Card className="glass backdrop-blur-md bg-white/5 border border-white/10">
                    <CardHeader>
                      <CardTitle className="text-2xl text-white mb-4">
                        Results
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white leading-relaxed">
                        {paper.fullContent.results}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Conclusion */}
                  <Card className="glass backdrop-blur-md bg-white/5 border border-white/10">
                    <CardHeader>
                      <CardTitle className="text-2xl text-white mb-4">
                        Conclusion
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white leading-relaxed">
                        {paper.fullContent.conclusion}
                      </p>
                    </CardContent>
                  </Card>

                  {/* References */}
                  <Card className="glass backdrop-blur-md bg-white/5 border border-white/10">
                    <CardHeader>
                      <CardTitle className="text-2xl text-white mb-4">
                        References
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-2">
                        {paper.fullContent.references.map((ref, i) => (
                          <li key={i} className="text-white leading-relaxed">
                            <span className="text-blue-400 font-medium">
                              [{i + 1}]
                            </span>{" "}
                            {ref}
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Paper Stats */}
                  <Card className="glass backdrop-blur-md bg-white/5 border border-white/10">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">
                        Paper Statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-white">Citations:</span>
                        <span className="text-white font-medium">
                          {paper.citationCount}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white">Downloads:</span>
                        <span className="text-white font-medium">
                          {paper.downloads}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white">Views:</span>
                        <span className="text-white font-medium">
                          {paper.views}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white">Rating:</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white font-medium">
                            {paper.rating}/5
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="glass backdrop-blur-md bg-white/5 border border-white/10">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button
                        size="sm"
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={handleDownloadPDF}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full border-gray-600 text-white hover:bg-white/10"
                        onClick={handleShare}
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Paper
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default ReadPaper;
