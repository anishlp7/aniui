import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { Banner } from "@/components/ui/banner";
import { Tooltip } from "@/components/ui/tooltip";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

function FeedbackContent() {
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState({
    default: true,
    info: true,
    warning: true,
    destructive: true,
    success: true,
  });
  const { toast } = useToast();

  return (
    <ScrollView className="flex-1 px-4" contentContainerClassName="gap-4 py-6 pb-20">
      <Text variant="h2">Feedback</Text>
      <Text variant="muted">8 components for user feedback and notifications.</Text>

      {/* Alert */}
      <Card>
        <CardHeader>
          <CardTitle>Alert</CardTitle>
        </CardHeader>
        <CardContent className="gap-3">
          <Alert variant="default" title="Default">
            <AlertDescription>This is a default alert message.</AlertDescription>
          </Alert>
          <Alert variant="destructive" title="Destructive">
            <AlertDescription>Something went wrong. Please try again.</AlertDescription>
          </Alert>
          <Alert variant="success" title="Success">
            <AlertDescription>Your changes have been saved.</AlertDescription>
          </Alert>
          <Alert variant="warning" title="Warning">
            <AlertDescription>Your session will expire in 5 minutes.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* AlertDialog */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Dialog</CardTitle>
        </CardHeader>
        <CardContent className="gap-3">
          <Button onPress={() => setAlertDialogOpen(true)}>Delete Account</Button>
          <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. Your account and all data will be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onPress={() => setAlertDialogOpen(false)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onPress={() => setAlertDialogOpen(false)}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

      {/* Dialog */}
      <Card>
        <CardHeader>
          <CardTitle>Dialog</CardTitle>
        </CardHeader>
        <CardContent className="gap-3">
          <Button onPress={() => setDialogOpen(true)}>Edit Profile</Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Tap outside to close.
                </DialogDescription>
              </DialogHeader>
              <View className="gap-2 py-4">
                <Text variant="small">Name: John Doe</Text>
                <Text variant="small">Email: john@example.com</Text>
                <Text variant="muted">Tap outside the dialog to dismiss.</Text>
              </View>
              <DialogFooter>
                <Button variant="outline" onPress={() => setDialogOpen(false)}>Close</Button>
                <Button onPress={() => setDialogOpen(false)}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Toast */}
      <Card>
        <CardHeader>
          <CardTitle>Toast</CardTitle>
        </CardHeader>
        <CardContent className="gap-3">
          <Button
            onPress={() => toast({ title: "Event created", description: "Friday, March 28 at 5:00 PM" })}
          >
            Default Toast
          </Button>
          <Button
            variant="destructive"
            onPress={() => toast({ title: "Error", description: "Failed to save changes.", variant: "destructive" })}
          >
            Destructive Toast
          </Button>
          <Button
            variant="outline"
            onPress={() => toast({ title: "Saved!", description: "Your settings have been updated.", variant: "success" })}
          >
            Success Toast
          </Button>
        </CardContent>
      </Card>

      {/* Banner */}
      <Card>
        <CardHeader>
          <CardTitle>Banner</CardTitle>
        </CardHeader>
        <CardContent className="gap-3">
          {bannerVisible.default && (
            <Banner variant="default" onDismiss={() => setBannerVisible((p) => ({ ...p, default: false }))}>
              Default banner notification.
            </Banner>
          )}
          {bannerVisible.info && (
            <Banner variant="info" onDismiss={() => setBannerVisible((p) => ({ ...p, info: false }))}>
              New version available. Update now.
            </Banner>
          )}
          {bannerVisible.warning && (
            <Banner variant="warning" onDismiss={() => setBannerVisible((p) => ({ ...p, warning: false }))}>
              Storage almost full (90% used).
            </Banner>
          )}
          {bannerVisible.destructive && (
            <Banner variant="destructive" onDismiss={() => setBannerVisible((p) => ({ ...p, destructive: false }))}>
              Payment failed. Please update billing.
            </Banner>
          )}
          {bannerVisible.success && (
            <Banner variant="success" onDismiss={() => setBannerVisible((p) => ({ ...p, success: false }))}>
              Deployment successful!
            </Banner>
          )}
          {!Object.values(bannerVisible).some(Boolean) && (
            <Button
              variant="outline"
              onPress={() => setBannerVisible({ default: true, info: true, warning: true, destructive: true, success: true })}
            >
              Reset Banners
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Tooltip */}
      <Card>
        <CardHeader>
          <CardTitle>Tooltip</CardTitle>
        </CardHeader>
        <CardContent className="gap-3">
          <Text variant="muted">Press and hold the button to see tooltip.</Text>
          <View className="flex-row gap-4">
            <Tooltip content="This adds a new item" side="bottom">
              <Button variant="outline" size="sm">+ Add</Button>
            </Tooltip>
            <Tooltip content="Save your progress" side="bottom">
              <Button variant="outline" size="sm">Save</Button>
            </Tooltip>
          </View>
        </CardContent>
      </Card>

      {/* Popover */}
      <Card>
        <CardHeader>
          <CardTitle>Popover</CardTitle>
        </CardHeader>
        <CardContent className="gap-3">
          <Popover>
            <PopoverTrigger>
              <Button variant="outline">Open Popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <Text variant="large" className="mb-2">Settings</Text>
              <Text variant="muted" className="mb-1">Width: 100%</Text>
              <Text variant="muted" className="mb-1">Height: Auto</Text>
              <Text variant="muted">Max height: 400px</Text>
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>

      {/* DropdownMenu */}
      <Card>
        <CardHeader>
          <CardTitle>Dropdown Menu</CardTitle>
        </CardHeader>
        <CardContent className="gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">Open Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onPress={() => toast({ title: "Profile opened" })}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onPress={() => toast({ title: "Settings opened" })}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onPress={() => toast({ title: "Billing opened" })}>
                Billing
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem destructive onPress={() => toast({ title: "Logged out", variant: "destructive" })}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
    </ScrollView>
  );
}

export default function FeedbackScreen() {
  return (
    <ToastProvider>
      <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
        <FeedbackContent />
      </SafeAreaView>
    </ToastProvider>
  );
}
