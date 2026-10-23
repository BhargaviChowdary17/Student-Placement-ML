import os
import shutil
import subprocess
import tempfile


def run_process(command, test_input, cwd, timeout=5):
    try:
        result = subprocess.run(
            command,
            input=test_input,
            text=True,
            capture_output=True,
            timeout=timeout,
            cwd=cwd
        )

        if result.returncode != 0:
            return {
                "success": False,
                "output": result.stderr.strip()
            }

        return {
            "success": True,
            "output": result.stdout.strip()
        }

    except subprocess.TimeoutExpired:
        return {
            "success": False,
            "output": "Execution timed out."
        }

    except Exception as error:
        return {
            "success": False,
            "output": str(error)
        }


def run_python_code(code, test_input):
    temp_dir = tempfile.mkdtemp()

    try:
        file_path = os.path.join(temp_dir, "main.py")

        with open(file_path, "w", encoding="utf-8") as file:
            file.write(code)

        return run_process(
            ["python", file_path],
            test_input,
            temp_dir
        )

    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)


def run_java_code(code, test_input):
    temp_dir = tempfile.mkdtemp()

    try:
        file_path = os.path.join(temp_dir, "Main.java")

        with open(file_path, "w", encoding="utf-8") as file:
            file.write(code)

        compile_result = subprocess.run(
            ["javac", "Main.java"],
            cwd=temp_dir,
            text=True,
            capture_output=True,
            timeout=10
        )

        if compile_result.returncode != 0:
            return {
                "success": False,
                "output": compile_result.stderr.strip()
            }

        return run_process(
            ["java", "Main"],
            test_input,
            temp_dir
        )

    except FileNotFoundError:
        return {
            "success": False,
            "output": "Java compiler not found. Install JDK and add javac to PATH."
        }

    except subprocess.TimeoutExpired:
        return {
            "success": False,
            "output": "Compilation or execution timed out."
        }

    except Exception as error:
        return {
            "success": False,
            "output": str(error)
        }

    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)


def run_c_code(code, test_input):
    temp_dir = tempfile.mkdtemp()

    try:
        source_path = os.path.join(temp_dir, "main.c")
        executable = os.path.join(temp_dir, "main.exe")

        with open(source_path, "w", encoding="utf-8") as file:
            file.write(code)

        compile_result = subprocess.run(
            ["gcc", source_path, "-o", executable],
            text=True,
            capture_output=True,
            timeout=10
        )

        if compile_result.returncode != 0:
            return {
                "success": False,
                "output": compile_result.stderr.strip()
            }

        return run_process(
            [executable],
            test_input,
            temp_dir
        )

    except FileNotFoundError:
        return {
            "success": False,
            "output": "GCC compiler not found. Install MinGW/GCC and add it to PATH."
        }

    except subprocess.TimeoutExpired:
        return {
            "success": False,
            "output": "Compilation or execution timed out."
        }

    except Exception as error:
        return {
            "success": False,
            "output": str(error)
        }

    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)


def run_cpp_code(code, test_input):
    temp_dir = tempfile.mkdtemp()

    try:
        source_path = os.path.join(temp_dir, "main.cpp")
        executable = os.path.join(temp_dir, "main.exe")

        with open(source_path, "w", encoding="utf-8") as file:
            file.write(code)

        compile_result = subprocess.run(
            ["g++", source_path, "-o", executable],
            text=True,
            capture_output=True,
            timeout=10
        )

        if compile_result.returncode != 0:
            return {
                "success": False,
                "output": compile_result.stderr.strip()
            }

        return run_process(
            [executable],
            test_input,
            temp_dir
        )

    except FileNotFoundError:
        return {
            "success": False,
            "output": "G++ compiler not found. Install MinGW/G++ and add it to PATH."
        }

    except subprocess.TimeoutExpired:
        return {
            "success": False,
            "output": "Compilation or execution timed out."
        }

    except Exception as error:
        return {
            "success": False,
            "output": str(error)
        }

    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)


def run_code(code, language, test_input):
    language = language.lower()

    if language == "python":
        return run_python_code(code, test_input)

    if language == "java":
        return run_java_code(code, test_input)

    if language == "c":
        return run_c_code(code, test_input)

    if language == "cpp":
        return run_cpp_code(code, test_input)

    return {
        "success": False,
        "output": "Unsupported programming language."
    }