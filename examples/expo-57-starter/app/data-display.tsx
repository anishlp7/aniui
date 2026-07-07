import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { List, ListItem, ListItemTitle, ListItemDescription } from "@/components/ui/list";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { Image } from "@/components/ui/image";
import { Carousel } from "@/components/ui/carousel";
import { Calendar } from "@/components/ui/calendar";
import { EmptyState } from "@/components/ui/empty-state";
import { SwipeableListItem } from "@/components/ui/swipeable-list-item";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { LabeledSeparator } from "@/components/ui/labeled-separator";
import { ProgressSteps, ProgressStep } from "@/components/ui/progress-steps";
import { Timeline, TimelineItem } from "@/components/ui/timeline";
import { ChatBubble } from "@/components/ui/chat-bubble";
import { TypingIndicator } from "@/components/ui/typing-indicator";
import { StatCard } from "@/components/ui/stat-card";
import { Price } from "@/components/ui/price";
import { Pagination } from "@/components/ui/pagination";
import { ImageGallery } from "@/components/ui/image-gallery";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text variant="h3">{title}</Text>
      {children}
      <Separator className="mt-2" />
    </View>
  );
}

export default function DataDisplayScreen() {
  const [progress, setProgress] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 2;
      });
    }, 80);
    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "hsl(0, 0%, 100%)" }}>
      <ScrollView className="flex-1 px-4" contentContainerClassName="gap-6 py-6">
        <Text variant="h2">Data Display</Text>
        <Text variant="muted">15 components for presenting content and data.</Text>

        {/* Text */}
        <Section title="Text">
          <Text variant="h1">Heading 1</Text>
          <Text variant="h2">Heading 2</Text>
          <Text variant="h3">Heading 3</Text>
          <Text variant="h4">Heading 4</Text>
          <Text variant="p">
            This is a paragraph. AniUI provides beautiful, minimal components for React Native.
          </Text>
          <Text variant="lead">Lead text for introductions</Text>
          <Text variant="large">Large emphasized text</Text>
          <Text variant="small">Small detail text</Text>
          <Text variant="muted">Muted secondary information</Text>
        </Section>

        {/* Badge */}
        <Section title="Badge">
          <View className="flex-row flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </View>
        </Section>

        {/* Card */}
        <Section title="Card">
          <Card>
            <CardHeader>
              <CardTitle>Project Update</CardTitle>
              <CardDescription>Latest status from the engineering team</CardDescription>
            </CardHeader>
            <CardContent>
              <Text variant="p">
                The new authentication flow has been deployed to staging. All integration tests
                are passing and performance metrics look good.
              </Text>
            </CardContent>
            <CardFooter>
              <Badge variant="secondary">In Review</Badge>
              <Text variant="muted" className="ml-auto">
                2 hours ago
              </Text>
            </CardFooter>
          </Card>
        </Section>

        {/* Avatar */}
        <Section title="Avatar">
          <View className="flex-row items-center gap-4">
            <Avatar
              size="sm"
              src="https://i.pravatar.cc/64?img=1"
              fallback="AL"
            />
            <Avatar
              size="md"
              src="https://i.pravatar.cc/128?img=2"
              fallback="JD"
            />
            <Avatar
              size="lg"
              src="https://i.pravatar.cc/256?img=3"
              fallback="MK"
            />
            <Avatar size="md" fallback="FB" />
            <Avatar size="lg" fallback="?" />
          </View>
          <Text variant="muted">Small, medium, large sizes with image and fallback initials</Text>
        </Section>

        {/* List */}
        <Section title="List">
          <List className="rounded-lg border border-border overflow-hidden">
            <ListItem>
              <View className="flex-1">
                <ListItemTitle>Notifications</ListItemTitle>
                <ListItemDescription>Manage your notification preferences</ListItemDescription>
              </View>
            </ListItem>
            <ListItem>
              <View className="flex-1">
                <ListItemTitle>Privacy</ListItemTitle>
                <ListItemDescription>Control who can see your profile</ListItemDescription>
              </View>
            </ListItem>
            <ListItem>
              <View className="flex-1">
                <ListItemTitle>Storage</ListItemTitle>
                <ListItemDescription>12.4 GB of 50 GB used</ListItemDescription>
              </View>
            </ListItem>
            <ListItem className="border-b-0">
              <View className="flex-1">
                <ListItemTitle>About</ListItemTitle>
                <ListItemDescription>Version 2.1.0</ListItemDescription>
              </View>
            </ListItem>
          </List>
        </Section>

        {/* Swipeable List Item */}
        <Section title="Swipeable List Item">
          <List className="rounded-lg border border-border overflow-hidden">
            <SwipeableListItem
              rightActions={[
                {
                  key: "archive",
                  label: "Archive",
                  color: "bg-amber-500",
                  onPress: () => Alert.alert("Archive", "Item archived"),
                },
                {
                  key: "delete",
                  label: "Delete",
                  color: "bg-destructive",
                  onPress: () => Alert.alert("Delete", "Item deleted"),
                },
              ]}
              leftActions={[
                {
                  key: "pin",
                  label: "Pin",
                  color: "bg-green-600",
                  onPress: () => Alert.alert("Pin", "Item pinned"),
                },
              ]}
            >
              <ListItem>
                <View className="flex-1">
                  <ListItemTitle>Design Review</ListItemTitle>
                  <ListItemDescription>Review the new onboarding flow</ListItemDescription>
                </View>
              </ListItem>
            </SwipeableListItem>
            <SwipeableListItem
              rightActions={[
                {
                  key: "delete",
                  label: "Delete",
                  color: "bg-destructive",
                  onPress: () => Alert.alert("Delete", "Item deleted"),
                },
              ]}
            >
              <ListItem>
                <View className="flex-1">
                  <ListItemTitle>Team Standup</ListItemTitle>
                  <ListItemDescription>Daily sync at 10:00 AM</ListItemDescription>
                </View>
              </ListItem>
            </SwipeableListItem>
            <SwipeableListItem
              rightActions={[
                {
                  key: "delete",
                  label: "Delete",
                  color: "bg-destructive",
                  onPress: () => Alert.alert("Delete", "Item deleted"),
                },
              ]}
            >
              <ListItem className="border-b-0">
                <View className="flex-1">
                  <ListItemTitle>Deploy v2.1</ListItemTitle>
                  <ListItemDescription>Push release to production</ListItemDescription>
                </View>
              </ListItem>
            </SwipeableListItem>
          </List>
          <Text variant="muted">Swipe left for delete/archive, swipe right to pin</Text>
        </Section>

        {/* Table */}
        <Section title="Table">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Alice Johnson</TableCell>
                <TableCell>Engineer</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bob Smith</TableCell>
                <TableCell>Designer</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Carol Lee</TableCell>
                <TableCell>PM</TableCell>
                <TableCell>Away</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Section>

        {/* Table — custom children (Badge, Avatar, composite content) */}
        <Section title="Table — custom cells">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <View className="flex-row items-center gap-2">
                    <Avatar size="sm" fallback="AJ" />
                    <Text variant="small">Alice Johnson</Text>
                  </View>
                </TableCell>
                <TableCell>Engineer</TableCell>
                <TableCell>
                  <Badge variant="default">Active</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <View className="flex-row items-center gap-2">
                    <Avatar size="sm" fallback="BS" />
                    <Text variant="small">Bob Smith</Text>
                  </View>
                </TableCell>
                <TableCell>Designer</TableCell>
                <TableCell>
                  <Badge variant="secondary">Away</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <View className="flex-row items-center gap-2">
                    <Avatar size="sm" fallback="CL" />
                    <Text variant="small">Carol Lee</Text>
                  </View>
                </TableCell>
                <TableCell>PM</TableCell>
                <TableCell>
                  <Badge variant="destructive">Offline</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Section>

        {/* Separator */}
        <Section title="Separator">
          <Text variant="p">Horizontal separator below:</Text>
          <Separator />
          <View className="flex-row items-center gap-4 h-8">
            <Text variant="small">Left</Text>
            <Separator orientation="vertical" />
            <Text variant="small">Center</Text>
            <Separator orientation="vertical" />
            <Text variant="small">Right</Text>
          </View>
        </Section>

        {/* Progress */}
        <Section title="Progress">
          <Text variant="small">Uploading... {Math.round(progress)}%</Text>
          <Progress value={progress} />
          <Text variant="muted">Animated progress cycling from 0 to 100%</Text>
        </Section>

        {/* Spinner */}
        <Section title="Spinner">
          <View className="flex-row items-center gap-8">
            <View className="items-center gap-2">
              <Spinner size="sm" />
              <Text variant="muted">Small</Text>
            </View>
            <View className="items-center gap-2">
              <Spinner size="md" />
              <Text variant="muted">Medium</Text>
            </View>
            <View className="items-center gap-2">
              <Spinner size="lg" />
              <Text variant="muted">Large</Text>
            </View>
          </View>
        </Section>

        {/* Skeleton */}
        <Section title="Skeleton">
          <View className="gap-3">
            <View className="flex-row items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <View className="flex-1 gap-2">
                <Skeleton className="h-4 w-3/4 rounded" />
                <Skeleton className="h-3 w-1/2 rounded" />
              </View>
            </View>
            <Skeleton className="h-32 w-full rounded-lg" />
            <View className="flex-row gap-2">
              <Skeleton className="h-8 flex-1 rounded" />
              <Skeleton className="h-8 flex-1 rounded" />
            </View>
          </View>
          <Text variant="muted">Pulsing placeholder for loading states</Text>
        </Section>

        {/* Image */}
        <Section title="Image">
          <Image
            src="https://picsum.photos/400/200"
            width={400}
            height={200}
            rounded="lg"
            alt="Sample landscape"
          />
          <View className="flex-row gap-3">
            <Image
              src="https://picsum.photos/120/120"
              width={120}
              height={120}
              rounded="full"
              alt="Circular image"
            />
            <Image
              src="https://invalid-url.example.com/broken.jpg"
              width={120}
              height={120}
              rounded="md"
              alt="Fallback demo"
            />
          </View>
          <Text variant="muted">Rounded variants with automatic error fallback</Text>
        </Section>

        {/* Carousel */}
        <Section title="Carousel">
          <Carousel
            data={[
              <View className="h-48 rounded-xl bg-primary items-center justify-center">
                <Text variant="h3" className="text-primary-foreground">
                  Slide 1
                </Text>
                <Text variant="muted" className="text-primary-foreground/70">
                  Swipe to navigate
                </Text>
              </View>,
              <View className="h-48 rounded-xl bg-secondary items-center justify-center">
                <Text variant="h3" className="text-secondary-foreground">
                  Slide 2
                </Text>
                <Text variant="muted">Beautiful transitions</Text>
              </View>,
              <View className="h-48 rounded-xl bg-accent items-center justify-center">
                <Text variant="h3" className="text-accent-foreground">
                  Slide 3
                </Text>
                <Text variant="muted">With dot indicators</Text>
              </View>,
            ]}
          />
        </Section>

        {/* Calendar */}
        <Section title="Calendar">
          <Card>
            <CardContent>
              <Calendar selected={selectedDate} onSelect={setSelectedDate} />
              <Text variant="small" className="text-center mt-3">
                Selected: {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </CardContent>
          </Card>
        </Section>

        {/* EmptyState */}
        <Section title="Empty State">
          <Card>
            <CardContent>
              <EmptyState
                icon={<Text className="text-4xl">📭</Text>}
                title="No messages yet"
                description="When you receive messages, they will appear here. Start a conversation to get going."
                action={{
                  label: "Send a Message",
                  onPress: () => Alert.alert("Action", "This would open a compose screen"),
                }}
              />
            </CardContent>
          </Card>
        </Section>

        {/* Status Indicator */}
        <Section title="Status Indicator">
          <View className="flex-row items-center gap-4">
            <View className="flex-row items-center gap-2">
              <StatusIndicator status="online" pulse />
              <Text variant="small">Online</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <StatusIndicator status="away" />
              <Text variant="small">Away</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <StatusIndicator status="busy" />
              <Text variant="small">Busy</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <StatusIndicator status="offline" />
              <Text variant="small">Offline</Text>
            </View>
          </View>
        </Section>

        {/* Labeled Separator */}
        <Section title="Labeled Separator">
          <LabeledSeparator label="OR" />
          <LabeledSeparator label="Continue with" />
        </Section>

        {/* Progress Steps */}
        <Section title="Progress Steps">
          <ProgressSteps current={1}>
            <ProgressStep label="Account" />
            <ProgressStep label="Profile" />
            <ProgressStep label="Review" />
          </ProgressSteps>
        </Section>

        {/* Timeline */}
        <Section title="Timeline">
          <Timeline>
            <TimelineItem variant="success" title="Order placed" description="Your order has been confirmed" time="2h ago" />
            <TimelineItem variant="success" title="Processing" description="Payment verified" time="1h ago" />
            <TimelineItem title="Shipped" description="Package on the way" time="30m ago" />
            <TimelineItem variant="muted" title="Delivered" description="Pending delivery" isLast />
          </Timeline>
        </Section>

        {/* Chat Bubble */}
        <Section title="Chat Bubble">
          <View className="gap-2">
            <ChatBubble variant="received" timestamp="10:30 AM">
              Hey, how are you?
            </ChatBubble>
            <ChatBubble variant="sent" timestamp="10:31 AM" status="read">
              I'm great! Working on AniUI.
            </ChatBubble>
            <TypingIndicator />
          </View>
        </Section>

        {/* Stat Card */}
        <Section title="Stat Card">
          <View className="flex-row gap-3">
            <StatCard className="flex-1" label="Revenue" value="$12.4k" change={12.5} trend="up" />
            <StatCard className="flex-1" label="Users" value="1,234" change={-3.2} trend="down" />
          </View>
        </Section>

        {/* Price */}
        <Section title="Price">
          <View className="flex-row items-center gap-3">
            <Price amount={99.99} />
            <Price amount={149.99} strikethrough />
            <Price amount={29.99} currency="EUR" prefix="From" />
          </View>
        </Section>

        {/* Pagination */}
        <Section title="Pagination">
          <Pagination total={10} current={3} onPageChange={() => {}} />
        </Section>

        <Text variant="muted" className="text-center mt-4 mb-8">
          Built with AniUI
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
