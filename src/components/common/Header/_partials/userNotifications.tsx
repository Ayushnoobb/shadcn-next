import { Button } from "@/components/ui/button"
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuGroup, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { BellIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const UserNotifications : React.FC = () => {
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="relative h-8 w-8 rounded-full"
                >
                    <BellIcon className="w-[1.2rem] h-[1.2rem]"/>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-80" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Notifications</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="hover:cursor-pointer" asChild>
                        <p>Notification</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="https://smarthr.dreamstechnologies.com/laravel/template/public/activity">
                            <div className="flex gap-2">
                                <div className="w-[35px] h-[35px]  relative">
                                    <Image src="https://smarthr.dreamstechnologies.com/laravel/template/public/build/img/profiles/avatar-27.jpg" 
                                    alt="Profile" fill className="aspect-square rounded-full"/>
                                </div>
                                <div className="flex-1">
                                    <p className="mb-1"><span className="text-dark font-semibold">Shawn </span>
                                        performance in Math is below the threshold.
                                    </p>
                                    <span className="text-xs text-right block">Just Now</span>
                                </div>
                            </div>
                        </Link>
                    </DropdownMenuItem>
                    
                </DropdownMenuGroup>
                
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

{/* <div class="d-flex flex-column">
    <div class="border-bottom mb-3 pb-3">
        <a href="https://smarthr.dreamstechnologies.com/laravel/template/public/activity">
            <div class="d-flex">
                <span class="avatar avatar-lg me-2 flex-shrink-0">
                    <img src="https://smarthr.dreamstechnologies.com/laravel/template/public/build/img/profiles/avatar-27.jpg" alt="Profile">
                </span>
                <div class="flex-grow-1">
                    <p class="mb-1"><span class="text-dark fw-semibold">Shawn</span>
                        performance in Math is below the threshold.</p>
                    <span>Just Now</span>
                </div>
            </div>
        </a>
    </div>
    <div class="border-bottom mb-3 pb-3">
        <a href="https://smarthr.dreamstechnologies.com/laravel/template/public/activity" class="pb-0">
            <div class="d-flex">
                <span class="avatar avatar-lg me-2 flex-shrink-0">
                    <img src="https://smarthr.dreamstechnologies.com/laravel/template/public/build/img/profiles/avatar-23.jpg" alt="Profile">
                </span>
                <div class="flex-grow-1">
                    <p class="mb-1"><span class="text-dark fw-semibold">Sylvia</span> added
                        appointment on 02:00 PM</p>
                    <span>10 mins ago</span>
                    <div class="d-flex justify-content-start align-items-center mt-1">
                        <span class="btn btn-light btn-sm me-2">Deny</span>
                        <span class="btn btn-primary btn-sm">Approve</span>
                    </div>
                </div>
            </div>
        </a>
    </div>
    <div class="border-bottom mb-3 pb-3">
        <a href="https://smarthr.dreamstechnologies.com/laravel/template/public/activity">
            <div class="d-flex">
                <span class="avatar avatar-lg me-2 flex-shrink-0">
                    <img src="https://smarthr.dreamstechnologies.com/laravel/template/public/build/img/profiles/avatar-25.jpg" alt="Profile">
                </span>
                <div class="flex-grow-1">
                    <p class="mb-1">New student record <span class="text-dark fw-semibold"> George</span> is created by <span class="text-dark fw-semibold">Teressa</span></p>
                    <span>2 hrs ago</span>
                </div>
            </div>
        </a>
    </div>
    <div class="border-0 mb-3 pb-0">
        <a href="https://smarthr.dreamstechnologies.com/laravel/template/public/activity">
            <div class="d-flex">
                <span class="avatar avatar-lg me-2 flex-shrink-0">
                    <img src="https://smarthr.dreamstechnologies.com/laravel/template/public/build/img/profiles/avatar-01.jpg" alt="Profile">
                </span>
                <div class="flex-grow-1">
                    <p class="mb-1">A new teacher record for <span class="text-dark fw-semibold">Elisa</span> </p>
                    <span>09:45 AM</span>
                </div>
            </div>
        </a>
    </div>
</div> */}

export default UserNotifications