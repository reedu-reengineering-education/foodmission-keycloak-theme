import { Button } from "./button";
import { Input } from "./input";
import { Card, CardHeader, CardTitle, CardContent } from "./card";
import { Alert, AlertTitle, AlertDescription } from "./alert";
import { Label } from "./label";
import { Checkbox } from "./checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export function TestComponents() {
  return (
    <div className="p-8 space-y-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>FOODMISSION UI Components Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="test-input">Test Input</Label>
            <Input id="test-input" placeholder="Enter text here..." />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="test-checkbox" />
            <Label htmlFor="test-checkbox">Accept terms and conditions</Label>
          </div>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex space-x-2">
            <Button variant="default">Default Button</Button>
            <Button variant="default">FOODMISSION Primary</Button>
            <Button variant="secondary">FOODMISSION Secondary</Button>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription>
          shadcn/ui components have been successfully integrated with
          FOODMISSION branding.
        </AlertDescription>
      </Alert>

      <Alert variant="default">
        <AlertTitle>FOODMISSION Success</AlertTitle>
        <AlertDescription>
          Custom FOODMISSION alert variant is working correctly.
        </AlertDescription>
      </Alert>
    </div>
  );
}
