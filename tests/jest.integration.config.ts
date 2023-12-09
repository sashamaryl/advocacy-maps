import { Config } from "@jest/types"
import nextJest from "next/jest"
import { runAgainstEmulators } from "../scripts/configure"

runAgainstEmulators()

const config: Config.InitialOptions = {
  clearMocks: true,
  testEnvironment: "./tests/integrationEnvironment.ts",
  rootDir: "..",
  testPathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/tests/system",
    "<rootDir>/tests/seed",
    "<rootDir>/functions"
  ],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.integration.ts"],
  modulePaths: ["<rootDir>"],
  reporters: ["default", ["jest-summary-reporter", { failuresOnly: false }]]
}

const modulesToTransform = ["@firebase", "firebase","firebase-admin", "nanoid", "@google-cloud/storage", "jose"]

// See https://nextjs.org/docs/advanced-features/compiler#jest
const cfg = async () => {
  const res = await nextJest()(config)()

  let transformIgnorePatterns = res.transformIgnorePatterns ?? []
  transformIgnorePatterns = transformIgnorePatterns.filter(
    (p: any) => !p.includes("node_modules")
  )
  transformIgnorePatterns.push(
    `/node_modules/(?!(${modulesToTransform.join("|")})/)`
  )
  // transformIgnorePatterns.push('^(?!(functions)/)')
  res.transformIgnorePatterns = transformIgnorePatterns

  console.log(res)
  return res
}

export default cfg
