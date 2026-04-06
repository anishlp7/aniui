import React, { useState } from "react";
import { ScrollView, View, Pressable, Text as RNText } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Stepper } from "@/components/ui/stepper";
import { InputOTP } from "@/components/ui/input-otp";
import { SearchBar } from "@/components/ui/search-bar";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Rating } from "@/components/ui/rating";
import { Chip } from "@/components/ui/chip";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { PasswordInput } from "@/components/ui/password-input";
import { MaskedInput } from "@/components/ui/masked-input";
import { PhoneInput } from "@/components/ui/phone-input";
import { NumberInput } from "@/components/ui/number-input";
import { Combobox } from "@/components/ui/combobox";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FilePicker } from "@/components/ui/file-picker";

export default function FormsScreen() {
  // Input states
  const [defaultInput, setDefaultInput] = useState("");
  const [ghostInput, setGhostInput] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [clearableInput, setClearableInput] = useState("");

  // Textarea state
  const [textareaValue, setTextareaValue] = useState("");
  const maxChars = 200;

  // Checkbox state
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);

  // Switch state
  const [switchOn, setSwitchOn] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Radio state
  const [radioValue, setRadioValue] = useState("option1");

  // Select state
  const [selectValue, setSelectValue] = useState("");

  // Slider state
  const [sliderValue, setSliderValue] = useState(40);

  // Stepper state
  const [stepperValue, setStepperValue] = useState(3);

  // OTP state
  const [otpValue, setOtpValue] = useState("");

  // Search state
  const [searchText, setSearchText] = useState("");

  // Date picker state
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Toggle state
  const [boldPressed, setBoldPressed] = useState(false);
  const [italicPressed, setItalicPressed] = useState(false);

  // Toggle group state
  const [alignment, setAlignment] = useState("left");

  // Rating state
  const [ratingValue, setRatingValue] = useState(3);

  // Chip state
  const [chips, setChips] = useState<Record<string, boolean>>({
    React: true,
    TypeScript: false,
    NativeWind: true,
    Expo: false,
    Reanimated: false,
  });

  // Segmented control state
  const [segment, setSegment] = useState("Daily");

  // Password input state
  const [passwordValue, setPasswordValue] = useState("");

  // Masked input state
  const [cardNumber, setCardNumber] = useState("");

  // Number input state
  const [quantity, setQuantity] = useState(1);

  // Combobox state
  const [comboValue, setComboValue] = useState("");

  // File picker state
  const [file, setFile] = useState<{ name: string; size?: number } | undefined>(undefined);

  const selectOptions = [
    { label: "React Native", value: "rn" },
    { label: "Flutter", value: "flutter" },
    { label: "SwiftUI", value: "swiftui" },
    { label: "Jetpack Compose", value: "compose" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "hsl(0, 0%, 100%)" }} edges={["bottom"]}>
      <ScrollView
        className="flex-1 px-4"
        contentContainerClassName="gap-4 py-6 pb-12"
        keyboardShouldPersistTaps="handled"
      >
        <Text variant="h2">Forms</Text>
        <Text variant="muted">17 interactive form components</Text>

        {/* Input */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Input</CardTitle>
          </CardHeader>
          <CardContent className="gap-4">
            <View>
              <Label>Default Input</Label>
              <Input
                placeholder="Type something..."
                value={defaultInput}
                onChangeText={setDefaultInput}
              />
            </View>

            <View>
              <Label>Ghost Variant</Label>
              <Input
                variant="ghost"
                placeholder="Ghost input..."
                value={ghostInput}
                onChangeText={setGhostInput}
              />
            </View>

            <View>
              <Label>Password (with toggle)</Label>
              <Input
                placeholder="Enter password..."
                secureTextEntry={!passwordVisible}
                value={password}
                onChangeText={setPassword}
                trailingIcon={
                  <Pressable onPress={() => setPasswordVisible(!passwordVisible)}>
                    <RNText style={{ fontSize: 13, color: "#71717a" }}>
                      {passwordVisible ? "Hide" : "Show"}
                    </RNText>
                  </Pressable>
                }
              />
            </View>

            <View>
              <Label>Clearable Input</Label>
              <Input
                placeholder="Type to see clear button..."
                value={clearableInput}
                onChangeText={setClearableInput}
                trailingIcon={
                  clearableInput.length > 0 ? (
                    <Pressable onPress={() => setClearableInput("")}>
                      <RNText style={{ fontSize: 14, color: "#71717a" }}>✕</RNText>
                    </Pressable>
                  ) : undefined
                }
              />
            </View>

            <View>
              <Label>With Leading Icon</Label>
              <Input
                placeholder="Search..."
                leadingIcon={
                  <RNText style={{ fontSize: 14, color: "#71717a" }}>&#x2315;</RNText>
                }
              />
            </View>

            <View>
              <Label>Sizes</Label>
              <View className="gap-2">
                <Input size="sm" placeholder="Small" />
                <Input size="md" placeholder="Medium (default)" />
                <Input size="lg" placeholder="Large" />
              </View>
            </View>
          </CardContent>
        </Card>

        {/* Textarea */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Textarea</CardTitle>
          </CardHeader>
          <CardContent className="gap-2">
            <Label>Bio</Label>
            <Textarea
              placeholder="Tell us about yourself..."
              value={textareaValue}
              onChangeText={(t) => setTextareaValue(t.slice(0, maxChars))}
              maxLength={maxChars}
            />
            <Text variant="muted" className="text-right">
              {textareaValue.length}/{maxChars}
            </Text>
          </CardContent>
        </Card>

        {/* Label + Input */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Label</CardTitle>
          </CardHeader>
          <CardContent className="gap-4">
            <View>
              <Label>Email Address</Label>
              <Input placeholder="you@example.com" keyboardType="email-address" />
            </View>
            <View>
              <Label>Phone Number</Label>
              <Input placeholder="+1 (555) 000-0000" keyboardType="phone-pad" />
            </View>
          </CardContent>
        </Card>

        {/* Checkbox */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Checkbox</CardTitle>
          </CardHeader>
          <CardContent className="gap-1">
            <View className="flex-row items-center">
              <Checkbox checked={checked1} onCheckedChange={setChecked1} />
              <Text variant="p">Accept terms and conditions</Text>
            </View>
            <View className="flex-row items-center">
              <Checkbox checked={checked2} onCheckedChange={setChecked2} />
              <Text variant="p">Subscribe to newsletter</Text>
            </View>
            <View className="flex-row items-center">
              <Checkbox checked={checked3} onCheckedChange={setChecked3} />
              <Text variant="p">Enable notifications</Text>
            </View>
          </CardContent>
        </Card>

        {/* Switch */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Switch</CardTitle>
          </CardHeader>
          <CardContent className="gap-4">
            <View className="flex-row items-center justify-between">
              <Text variant="p">Airplane Mode</Text>
              <Switch value={switchOn} onValueChange={setSwitchOn} />
            </View>
            <View className="flex-row items-center justify-between">
              <Text variant="p">Dark Mode</Text>
              <Switch value={darkMode} onValueChange={setDarkMode} />
            </View>
          </CardContent>
        </Card>

        {/* Radio Group */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Radio Group</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={radioValue} onValueChange={setRadioValue}>
              <RadioGroupItem value="option1" label="Free plan" />
              <RadioGroupItem value="option2" label="Pro plan ($9/mo)" />
              <RadioGroupItem value="option3" label="Enterprise (custom)" />
            </RadioGroup>
            <Text variant="muted" className="mt-3">
              Selected: {radioValue}
            </Text>
          </CardContent>
        </Card>

        {/* Select */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Select</CardTitle>
          </CardHeader>
          <CardContent className="gap-2">
            <Label>Favorite Framework</Label>
            <Select
              placeholder="Choose a framework..."
              label="Favorite Framework"
              options={selectOptions}
              value={selectValue}
              onValueChange={setSelectValue}
            />
            {selectValue ? (
              <Text variant="muted">
                Selected: {selectOptions.find((o) => o.value === selectValue)?.label}
              </Text>
            ) : null}
          </CardContent>
        </Card>

        {/* Slider */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Slider</CardTitle>
          </CardHeader>
          <CardContent className="gap-2">
            <View className="flex-row items-center justify-between">
              <Label>Volume</Label>
              <Text variant="small" className="text-muted-foreground">
                {sliderValue}%
              </Text>
            </View>
            <Slider
              value={sliderValue}
              min={0}
              max={100}
              step={1}
              onValueChange={setSliderValue}
            />
          </CardContent>
        </Card>

        {/* Stepper */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Stepper</CardTitle>
          </CardHeader>
          <CardContent className="gap-2">
            <Label>Quantity</Label>
            <View className="flex-row items-center gap-4">
              <Stepper
                value={stepperValue}
                onChange={setStepperValue}
                min={0}
                max={20}
              />
              <Text variant="muted">Value: {stepperValue}</Text>
            </View>
          </CardContent>
        </Card>

        {/* Input OTP */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Input OTP</CardTitle>
          </CardHeader>
          <CardContent className="gap-2">
            <Label>Verification Code</Label>
            <InputOTP length={6} value={otpValue} onValueChange={setOtpValue} />
            {otpValue.length === 6 && (
              <Text variant="muted">Code entered: {otpValue}</Text>
            )}
          </CardContent>
        </Card>

        {/* Search Bar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Search Bar</CardTitle>
          </CardHeader>
          <CardContent className="gap-2">
            <SearchBar
              value={searchText}
              onChangeText={setSearchText}
              onClear={() => setSearchText("")}
              placeholder="Search components..."
            />
            {searchText.length > 0 && (
              <Text variant="muted">Searching for: "{searchText}"</Text>
            )}
          </CardContent>
        </Card>

        {/* Date Picker */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Date Picker</CardTitle>
          </CardHeader>
          <CardContent className="gap-2">
            <Label>Pick a Date</Label>
            <DatePicker
              value={selectedDate}
              onChange={setSelectedDate}
              placeholder="Select a date..."
            />
            {selectedDate && (
              <Text variant="muted">
                Selected: {selectedDate.toLocaleDateString()}
              </Text>
            )}
          </CardContent>
        </Card>

        {/* Toggle */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Toggle</CardTitle>
          </CardHeader>
          <CardContent>
            <View className="flex-row gap-2">
              <Toggle
                variant="outline"
                pressed={boldPressed}
                onPressedChange={setBoldPressed}
              >
                B
              </Toggle>
              <Toggle
                variant="outline"
                pressed={italicPressed}
                onPressedChange={setItalicPressed}
              >
                I
              </Toggle>
            </View>
            <Text variant="muted" className="mt-3">
              Bold: {boldPressed ? "On" : "Off"} | Italic:{" "}
              {italicPressed ? "On" : "Off"}
            </Text>
          </CardContent>
        </Card>

        {/* Toggle Group */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Toggle Group</CardTitle>
          </CardHeader>
          <CardContent className="gap-2">
            <Label>Text Alignment</Label>
            <ToggleGroup value={alignment} onValueChange={setAlignment}>
              <ToggleGroupItem value="left">Left</ToggleGroupItem>
              <ToggleGroupItem value="center">Center</ToggleGroupItem>
              <ToggleGroupItem value="right">Right</ToggleGroupItem>
            </ToggleGroup>
            <Text variant="muted">Alignment: {alignment}</Text>
          </CardContent>
        </Card>

        {/* Rating */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Rating</CardTitle>
          </CardHeader>
          <CardContent className="gap-3">
            <View>
              <Label>Rate your experience</Label>
              <Rating value={ratingValue} onChange={setRatingValue} size="lg" />
              <Text variant="muted" className="mt-1">
                {ratingValue} of 5 stars
              </Text>
            </View>
          </CardContent>
        </Card>

        {/* Chip */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Chip</CardTitle>
          </CardHeader>
          <CardContent className="gap-2">
            <Label>Select Technologies</Label>
            <View className="flex-row flex-wrap gap-2">
              {Object.entries(chips).map(([name, selected]) => (
                <Chip
                  key={name}
                  selected={selected}
                  onPress={() =>
                    setChips((prev) => ({ ...prev, [name]: !prev[name] }))
                  }
                >
                  {name}
                </Chip>
              ))}
            </View>
            <Text variant="muted">
              Selected:{" "}
              {Object.entries(chips)
                .filter(([, v]) => v)
                .map(([k]) => k)
                .join(", ") || "None"}
            </Text>
          </CardContent>
        </Card>

        {/* Segmented Control */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Segmented Control</CardTitle>
          </CardHeader>
          <CardContent className="gap-3">
            <Label>Frequency</Label>
            <SegmentedControl
              options={["Daily", "Weekly", "Monthly"]}
              value={segment}
              onValueChange={setSegment}
            />
            <Text variant="muted">Selected: {segment}</Text>
          </CardContent>
        </Card>

        {/* Password Input */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Password Input</CardTitle>
          </CardHeader>
          <CardContent className="gap-3">
            <Label>Password</Label>
            <PasswordInput
              placeholder="Enter password"
              value={passwordValue}
              onChangeText={setPasswordValue}
              showStrength
            />
          </CardContent>
        </Card>

        {/* Masked Input */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Masked Input</CardTitle>
          </CardHeader>
          <CardContent className="gap-3">
            <Label>Credit Card</Label>
            <MaskedInput
              preset="credit-card"
              placeholder="0000 0000 0000 0000"
              value={cardNumber}
              onChangeText={(masked) => setCardNumber(masked)}
            />
            <Label>Phone</Label>
            <MaskedInput
              preset="phone"
              placeholder="(000) 000-0000"
            />
          </CardContent>
        </Card>

        {/* Phone Input */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Phone Input</CardTitle>
          </CardHeader>
          <CardContent className="gap-3">
            <Label>Phone Number</Label>
            <PhoneInput defaultCountry="US" />
          </CardContent>
        </Card>

        {/* Number Input */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Number Input</CardTitle>
          </CardHeader>
          <CardContent className="gap-3">
            <Label>Quantity</Label>
            <NumberInput value={quantity} onValueChange={setQuantity} min={1} max={99} />
            <Text variant="muted">Value: {quantity}</Text>
          </CardContent>
        </Card>

        {/* Combobox */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Combobox</CardTitle>
          </CardHeader>
          <CardContent className="gap-3">
            <Label>Framework</Label>
            <Combobox
              options={[
                { label: "React Native", value: "rn" },
                { label: "Flutter", value: "flutter" },
                { label: "SwiftUI", value: "swiftui" },
                { label: "Jetpack Compose", value: "compose" },
                { label: "Kotlin Multiplatform", value: "kmp" },
              ]}
              value={comboValue}
              onValueChange={setComboValue}
              placeholder="Search frameworks..."
            />
          </CardContent>
        </Card>

        {/* Form Context */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Form Validation</CardTitle>
          </CardHeader>
          <CardContent className="gap-3">
            <Form>
              <FormField name="email">
                <FormItem>
                  <Label>Email</Label>
                  <Input placeholder="john@example.com" />
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField name="name">
                <FormItem>
                  <Label>Name</Label>
                  <Input placeholder="John Doe" />
                  <FormMessage />
                </FormItem>
              </FormField>
            </Form>
          </CardContent>
        </Card>

        {/* File Picker */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">File Picker</CardTitle>
          </CardHeader>
          <CardContent className="gap-3">
            <FilePicker
              file={file}
              onPress={() => setFile({ name: "document.pdf", size: 245000 })}
              onRemove={() => setFile(undefined)}
              label="Tap to upload a document"
            />
          </CardContent>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
