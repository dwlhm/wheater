import { describe, expect, it, test } from "vitest";
import { WheaterModeToString } from "../utils";
import Image from "next/image";

const dummyWeatherCode = 1;

describe(`covert weather code to text & icon`, () => {
  it(`convert weather code correctly`, () => {
    expect(WheaterModeToString(dummyWeatherCode)).toStrictEqual({
      text: "Mainly clear",
      icon: (
        <Image
          className="animate-pulse"
          src="/icons/mainly_clear.png"
          alt="Mainly clear"
          width={150}
          height={150}
        />
      ),
    });
  });
});
