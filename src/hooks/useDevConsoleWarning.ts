import { useEffect } from "react";

const dev = process.env.NODE_ENV !== "production";

export default function useDevConsoleWarning() {
    const PrintWarning = () => {
        console.log(
          "%cSTOP!",
          "color: white; background-color: red; font-size: 50px; font-weight: bold; padding: 20px 40px; text-align: center; display: block;",
        );
    
        console.log(
          "%cThis is a browser feature intended for developers ONLY. If someone told you to copy and paste something here, it is a scam and will give them access to your account.",
          "color: black; background-color: yellow; font-size: 20px; font-weight: bold; padding: 10px 20px; display: block;",
        );
    
        console.log(
          "%cNAuth support or other employees WILL NEVER ask you to execute any code here.",
          "color: black; background-color: yellow; font-size: 20px; font-weight: bold; padding: 10px 20px; display: block;",
        );
    
        console.log(
          "%cDO NOT EXECUTE ANY CODE HERE!",
          "color: white; background-color: red; font-size: 30px; font-weight: bold; padding: 10px 20px; display: block;",
        );
    
        console.log(
          "%cAND PLEASE HIRE ME ;)",
          "color: white; background-color: red; font-size: 30px; font-weight: bold; padding: 10px 20px; display: block;",
        );
      };
    
      useEffect(() => {
        if (!dev) {
          PrintWarning();
          const interval = setInterval(PrintWarning, 60_000);
          return () => clearInterval(interval);
        }
      }, []);
}