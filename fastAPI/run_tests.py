#!/usr/bin/env python3
"""
Test runner script for FastAPI application
"""

import subprocess
import sys
import argparse


def run_command(command):
    """Run a command and return the result"""
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(result.stdout)
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error running command: {e}")
        print(f"Error output: {e.stderr}")
        return False


def main():
    parser = argparse.ArgumentParser(description="Run FastAPI tests")
    parser.add_argument("--coverage", action="store_true", help="Run tests with coverage")
    parser.add_argument("--html", action="store_true", help="Generate HTML coverage report")
    parser.add_argument("--fast", action="store_true", help="Run only fast tests (exclude slow)")
    parser.add_argument("--unit", action="store_true", help="Run only unit tests")
    parser.add_argument("--integration", action="store_true", help="Run only integration tests")
    parser.add_argument("--verbose", "-v", action="store_true", help="Verbose output")
    parser.add_argument("--file", help="Run specific test file")
    
    args = parser.parse_args()
    
    # Build pytest command
    cmd = ["pytest"]
    
    if args.coverage:
        cmd.extend(["--cov=app", "--cov-report=term-missing"])
    
    if args.html:
        cmd.extend(["--cov-report=html:htmlcov"])
    
    if args.fast:
        cmd.extend(["-m", "not slow"])
    
    if args.unit:
        cmd.extend(["-m", "unit"])
    
    if args.integration:
        cmd.extend(["-m", "integration"])
    
    if args.verbose:
        cmd.append("-v")
    
    if args.file:
        cmd.append(args.file)
    
    # Run the command
    command = " ".join(cmd)
    print(f"Running: {command}")
    
    success = run_command(command)
    
    if success:
        print("\n✅ Tests completed successfully!")
        if args.html:
            print("📊 HTML coverage report generated in htmlcov/")
    else:
        print("\n❌ Tests failed!")
        sys.exit(1)


if __name__ == "__main__":
    main() 