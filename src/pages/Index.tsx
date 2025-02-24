import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [apiKey, setApiKey] = useState("");
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [width, setWidth] = useState(768);
  const [height, setHeight] = useState(768);
  const [numOutputs, setNumOutputs] = useState(1);
  const [scheduler, setScheduler] = useState("K_EULER");
  const [numInferenceSteps, setNumInferenceSteps] = useState(50);
  const [guidanceScale, setGuidanceScale] = useState(7.5);
  const [seed, setSeed] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem("replicate_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  // Save API key to localStorage whenever it changes
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem("replicate_api_key", apiKey);
    }
  }, [apiKey]);

  const handleGenerateImage = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Replicate API key to generate images.",
        variant: "destructive",
      });
      return;
    }

    if (!prompt) {
      toast({
        title: "Prompt Required",
        description: "Please enter a prompt to generate an image.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedImages([]);

    try {
      // This is a placeholder for the actual API call
      // In a real implementation, you would make a fetch request to Replicate's API
      // or to your own backend that handles the API call
      
      toast({
        title: "API Integration Required",
        description: "This is a UI demo. Add your backend integration to make actual API calls to Replicate.",
      });
      
      // Simulate a delay for demonstration purposes
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Placeholder for generated images
      setGeneratedImages([
        "https://replicate.delivery/pbxt/4kw2JSufHBENDD7Fbg11PmNYOLNnkbMSWYIhM7zUk6WZYFjIA/out-0.png"
      ]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate image. Please try again.",
        variant: "destructive",
      });
      console.error("Error generating image:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateRandomSeed = () => {
    const randomSeed = Math.floor(Math.random() * 1000000000).toString();
    setSeed(randomSeed);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Replicate API Key</CardTitle>
          <CardDescription>
            Your API key is stored locally in your browser.{" "}
            <a 
              href="https://replicate.com/account/api-tokens" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Get your API key here
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              type="password"
              placeholder="Enter your Replicate API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1"
            />
            <Button 
              variant="outline" 
              onClick={() => {
                localStorage.removeItem("replicate_api_key");
                setApiKey("");
                toast({
                  title: "API Key Cleared",
                  description: "Your API key has been removed from local storage.",
                });
              }}
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Image Generation</CardTitle>
              <CardDescription>Configure your image generation settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>
                <TabsContent value="basic" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="prompt">Prompt</Label>
                    <Textarea
                      id="prompt"
                      placeholder="A beautiful sunset over mountains, 4k, detailed"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="negative-prompt">Negative Prompt</Label>
                    <Textarea
                      id="negative-prompt"
                      placeholder="blurry, bad quality, distorted"
                      value={negativePrompt}
                      onChange={(e) => setNegativePrompt(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="width">Width</Label>
                      <Select value={width.toString()} onValueChange={(value) => setWidth(Number(value))}>
                        <SelectTrigger id="width">
                          <SelectValue placeholder="Select width" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="512">512px</SelectItem>
                          <SelectItem value="768">768px</SelectItem>
                          <SelectItem value="1024">1024px</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height">Height</Label>
                      <Select value={height.toString()} onValueChange={(value) => setHeight(Number(value))}>
                        <SelectTrigger id="height">
                          <SelectValue placeholder="Select height" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="512">512px</SelectItem>
                          <SelectItem value="768">768px</SelectItem>
                          <SelectItem value="1024">1024px</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="advanced" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="guidance-scale">Guidance Scale: {guidanceScale}</Label>
                    </div>
                    <Slider
                      id="guidance-scale"
                      min={1}
                      max={20}
                      step={0.1}
                      value={[guidanceScale]}
                      onValueChange={(value) => setGuidanceScale(value[0])}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="inference-steps">Inference Steps: {numInferenceSteps}</Label>
                    </div>
                    <Slider
                      id="inference-steps"
                      min={10}
                      max={150}
                      step={1}
                      value={[numInferenceSteps]}
                      onValueChange={(value) => setNumInferenceSteps(value[0])}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="scheduler">Scheduler</Label>
                    <Select value={scheduler} onValueChange={setScheduler}>
                      <SelectTrigger id="scheduler">
                        <SelectValue placeholder="Select scheduler" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="K_EULER">K Euler</SelectItem>
                        <SelectItem value="K_EULER_ANCESTRAL">K Euler Ancestral</SelectItem>
                        <SelectItem value="DPM_SOLVER">DPM Solver</SelectItem>
                        <SelectItem value="DDIM">DDIM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="num-outputs">Number of Images</Label>
                    <Select value={numOutputs.toString()} onValueChange={(value) => setNumOutputs(Number(value))}>
                      <SelectTrigger id="num-outputs">
                        <SelectValue placeholder="Select number of outputs" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seed">Seed (optional)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="seed"
                        placeholder="Random seed"
                        value={seed}
                        onChange={(e) => setSeed(e.target.value)}
                      />
                      <Button variant="outline" onClick={generateRandomSeed}>
                        Random
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={handleGenerateImage} 
                disabled={isGenerating}
              >
                {isGenerating ? "Generating..." : "Generate Image"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Generated Images</CardTitle>
              <CardDescription>
                Your generated images will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center h-[400px]">
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-4 text-muted-foreground">Generating your image...</p>
                </div>
              ) : generatedImages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {generatedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Generated image ${index + 1}`}
                        className="w-full h-auto rounded-lg object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = image;
                            link.download = `generated-image-${index}.png`;
                            link.click();
                          }}
                        >
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[400px] text-center">
                  <p className="text-muted-foreground">
                    No images generated yet. Fill in the form and click "Generate Image" to create an image.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;