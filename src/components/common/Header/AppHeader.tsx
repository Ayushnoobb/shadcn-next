import { ModeToggle } from "./_partials/modeToggle";
import { SheetMenu } from "./_partials/sheetMenu";
import { UserNav } from "./_partials/userNav";
import UserNotifications from "./_partials/userNotifications";


  const AppHeader : React.FC = () => {
    return (
      <header className="sticky top-0 z-10 w-full bg-background/95  shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
        <div className="mx-4 sm:mx-8 flex h-14 items-center">
          <div className="flex items-center space-x-4 lg:space-x-0">
            <SheetMenu />
          </div>
          <div className="flex flex-1 items-center gap-3 justify-end">
            <UserNotifications />
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </header>
    );
  }

  export default AppHeader


