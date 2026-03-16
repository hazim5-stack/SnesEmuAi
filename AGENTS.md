# AI Build Guardrails For This Workspace

## Supported target

The only supported Cloud/AI-integrated application target in this workspace is:

- `win32/snes9xw.vcxproj`

All Cloud/AI work must stay integrated into the Windows application itself.

## Do not use these as the main target

Unless the user explicitly asks otherwise, do not build, repair, or promote these projects as the primary application:

- `win32/SnesAiFinalInternal.vcxproj`
- `win32/SnesAiFinalProject/SnesAiFinal.vcxproj`

They are not the authoritative build path for the integrated app.

## Required build contract

Use exactly these settings for the supported target:

- `Platform=x64`
- `Configuration="Release Unicode"`
- `PlatformToolset=v143`

Do not switch the build to `v145`.

## Required dependency rebuild order

Before building `win32/snes9xw.vcxproj`, rebuild dependencies in this order:

1. `win32/zlib/zlib.vcxproj`
2. `win32/libpng/libpng.vcxproj`
3. `win32/glslang/SPIRV/SPIRV.vcxproj`

Step 3 transitively rebuilds:

- `HLSL`
- `OSDependent`
- `glslang`

After rebuilding, copy these outputs into the `win32/` root:

- `zlib.lib`
- `libpng.lib`
- `glslang.lib`
- `SPIRV.lib`
- `HLSL.lib`
- `OSDependent.lib`

Then build:

- `win32/snes9xw.vcxproj`

with:

- `/p:BuildProjectReferences=false`

## Verified build entrypoint

Prefer this script:

- `win32/build_main_release_x64.cmd`

## Hard build lock

The workspace now contains:

- `Directory.Build.targets`

This file actively blocks MSBuild builds for any project outside the allowed set:

- `win32/snes9xw.vcxproj`
- `win32/zlib/zlib.vcxproj`
- `win32/libpng/libpng.vcxproj`
- `win32/glslang/SPIRV/SPIRV.vcxproj`
- `win32/glslang/hlsl/HLSL.vcxproj`
- `win32/glslang/glslang/glslang.vcxproj`
- `win32/glslang/glslang/OSDependent/Windows/OSDependent.vcxproj`

If a different `.vcxproj` or MSBuild-based solution is used, the build must fail immediately with a message that points back to the supported AI-integrated target.

## Success criterion

The build is only considered successful if this file exists:

- `win32/SnesEmuAi-x64.exe`

## Code scope for Cloud/AI work

Cloud/AI integration is expected to live in:

- `win32/wsnes9x.cpp`
- `win32/SnesEmuAi*.h`

Do not move the feature set into a separate executable or alternate frontend unless the user explicitly requests that.

## Failure handling

If link error `C1047` appears, do not rewrite application code first.
Rebuild the dependency libraries with the same MSBuild/toolset version, then rebuild the app.
