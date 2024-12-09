import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Component() {
  return (
    <div className="min-h-[100vh] flex items-center justify-center">

        <Card className="mx-auto max-w-sm">
            <CardHeader className="space-y-1">
                <div className="flex">
                    <Image src={'https://www.kumarijob.com/soft-assets/images/logo.svg'} width={80} height={300} alt="brand-logo" className="block"/>
                </div>
                    <CardTitle className="text-2xl font-bold text-center">LOGIN</CardTitle>
                <CardDescription className="">Enter your email and password to login to your account</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                    Login
                </Button>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}